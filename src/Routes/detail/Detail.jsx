import React, { Fragment, useState, useEffect } from "react";
import Left from "./component/Left";
import Center from "./component/Center";
import Right from "./component/Right";
import Comment from "./component/Comment";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../loader/Loader";

function Detail() {
  const location = useLocation();
  const { slug } = location.state;

  const [product, setProduct] = useState({});
  const [image, setImage] = useState([]);
  const [colors, setColors] = useState([]);
  const [ulasan, setUlasan] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await axios
        .get(`http://localhost:4000/api/product/slug/${slug}`)
        .then((res) => {
          // console.log(res)
          setProduct(res.data.data);
          setImage(res.data.data.image);
          setColors(res.data.data.colors);
          setUlasan(res.data.data.comments);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getData();
  }, []);

  const View = () => {
    return (
      <>
        <div className="w-full flex flex-col md:flex-row overflow-y-hidden">
          <div className="left md:w-1/4 h-max m-7 md:m-2 p-2">
            <Left image={image} />
          </div>
          <div className="center md:w-1/3 m-7 md:m-2 pt-6 h-max ">
            <Center product={product} ulasan={ulasan} />
          </div>

          <div className="right h-max  md:w-2/6 m-6 rounded-md shadow-md shadow-cyan-300 p-6">
            <Right color={colors} product={product} />
          </div>
        </div>
        <div className="w-full mt-3 mb-12 flex justify-center h-[32rem] overflow-y-scroll scrollbar-hide">
          <div className="sm:w-2/5 mx-10 ">
            <Comment ulasan={ulasan} />
          </div>
        </div>
      </>
    );
  };

  const ViewLoader = () => {
    return (
      <>
        <div className="w-full h-screen">
          <div className="w-14 m-auto mt-28">
            <Loader />
          </div>
        </div>
      </>
    );
  };

  // console.log(title)
  return <Fragment>{loading === true ? <ViewLoader /> : <View />}</Fragment>;
}

export default Detail;
