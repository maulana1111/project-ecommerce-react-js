import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import LeftBar from "./component/LeftBar";
import RightSide from "./component/RightSide";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateSearchValue } from "../../redux/features/stmSlice";
import useSWR from "swr";

function Home() {
  const [dataProduk, setDataProduk] = useState([]);
  const [dataCategories, setDataCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paramCategory, setParamCategory] = useState(0);
  const [paramView, setParamView] = useState(false);
  const [titleCategory, setTitleCategory] = useState("");
  const [dataProdukByFilter, setDataProdukByFilter] = useState([]);
  const [tempDataProduk, setTempDataProduk] = useState([]);

  const { searchValue } = useSelector((state) => state.stm);

  const dispatch = useDispatch();

  const apiAddressProduct = "http://localhost:4000/api/products";
  const apiAddressCategory = "http://localhost:4000/api/category";

  const fetcherProduct = async (url) =>
    await axios.get(url).then((res) => res.data);
  const fetcherCategory = async (url) =>
    await axios.get(url).then((res) => res.data);

  useSWR(apiAddressCategory, fetcherCategory, {
    onSuccess: (data) => setDataCategories(data.data)
  });
  useSWR(apiAddressProduct, fetcherProduct, {
    onSuccess: (data) => [
      setDataProduk(data.data),
      setDataProdukByFilter(data.data),
      setTempDataProduk(data.data),
    ],
  });

  useEffect(() => {
    paramView ? filterData() : backData();
  }, [paramCategory]);

  useEffect(() => {
    searchValue && filterDataBySearch();
  }, [searchValue]);

  const backData = () => {
    setDataProdukByFilter(dataProduk);
    setTempDataProduk(dataProduk);
  };

  const filterData = () => {
    setDataProdukByFilter(
      dataProduk.filter((dataProduk) => {
        return dataProduk.categories_id
          .toString()
          .includes(paramCategory.toString());
      })
    );
    setTempDataProduk(
      dataProduk.filter((dataProduk) => {
        return dataProduk.categories_id
          .toString()
          .includes(paramCategory.toString());
      })
    );
  };

  const filterDataBySearch = () => {
    setDataProdukByFilter(
      tempDataProduk.filter((dt) => {
        return dt.title
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase());
      })
    );
  };

  const handleButtonCategory = (valueId, valueTitle) => {
    setParamView(true);
    setParamCategory(valueId);
    setTitleCategory(valueTitle);
  };

  const handleRollBackData = () => {
    setParamView(false);
    setParamCategory(0);
    setTitleCategory("");

    let searchValue = "";
    dispatch(updateSearchValue({ searchValue }));
  };

  const headerCat = () => {
    return (
      <div className="ml-4 my-6">
        <p className="text-2xl font-semibold text-cyan-500">
          Home/Category/{titleCategory}
        </p>
      </div>
    );
  };

  return (
    <Fragment>
      <div className="flex flex-col md:flex-row">
        <div className="m-6 h-44 md:h-96 md:w-64 border-solid border-2 border-cyan-400 p-6 rounded-lg shadow-md shadow-cyan-200">
          <p className="text-2xl font-semibold mb-4 text-cyan-300">
            Category :
          </p>
          <div className="overflow-x-scroll md:overflow-y-scroll scrollbar-hide h-5/6">
            <section className="w-40 flex flex-row md:flex-col space-x-3 md:space-x-0 ">
              <button onClick={() => handleRollBackData()}>
                <div className=" p-3 border-solid border-2 border-cyan-400 rounded-lg shadow-sm shadow-cyan-300 text-cyan-300 my-3 text-clip md:w-full w-max">
                  All Product
                </div>
              </button>
              {dataCategories?.map((item, i) => (
                <LeftBar
                  data={item}
                  key={i}
                  onClickChange={(valueId, valueTitle) =>
                    handleButtonCategory(valueId, valueTitle)
                  }
                />
              ))}
            </section>
          </div>
        </div>
        <div>
          {paramView && headerCat()}
          <div className=" w-full flex flex-wrap justify-center">
            {loading === true ? (
              <Loader />
            ) : (
              dataProdukByFilter?.map((data, i) => (
                <RightSide data={data} key={i} />
              ))
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
