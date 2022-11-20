import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import star from "../../../assets/icon_star.png";

const RightSide = (props) => {
  const { data } = props;

  var count = 0;
  data.rating.map((item) => {
    count += item.score;
  });
  var hasilRating = count / data.rating.length;

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const CountDisc = (price, disc) => {
    let hasil = price - (price / 100) * disc;
    return hasil;
  };

  const DiscView = () => {
    return (
      <>
        <div className="mr-2 bg-cyan-300 p-1 rounded-md shadow-md shadow-cyan-200 text-white">
          {data.discount}%
        </div>
        <div className="line-through p-1 text-gray-500">
          Rp. {rupiah(data.price)}
        </div>
      </>
    );
  };

  const viewWithLink = () => {
    return (
      <>
        <Link to="/detail" state={{ slug: data.slug }}>
          <div className="z-0">
            <img src={"./product/" + data.thumbnail} />
            <p className=" text-xl my-1">{data.title}</p>
            <p className="text-sm my-1 font-semibold">
              {rupiah(CountDisc(data.price, data.discount))}
            </p>
            <div className="flex text-sm  my-1">
              {data.discount && DiscView()}
            </div>
            <div className="flex space-x-2 text-gray-400">
              <div>
                <img src={star} alt="" className="w-5" />
              </div>
              <div>{hasilRating.toFixed(1)}</div>
              <div> | </div>
              <div>Sisa {data.stock} stock</div>
            </div>
          </div>
        </Link>
      </>
    );
  };

  const viewWithoutLink = () => {
    return (
      <>
        <div className="z-20 w-full bg-gray-500 opacity-30">
          <p className="text-3xl ml-2">HABIS !</p>
        </div>
        <div className="z-0">
          <img src={"./product/" + data.thumbnail} />
          <p className=" text-xl my-1">{data.title}</p>
          <p className="text-sm my-1 font-semibold">
            {rupiah(CountDisc(data.price, data.discount))}
          </p>
          <div className="flex text-sm  my-1">
            {data.discount && DiscView()}
          </div>
          <div className="flex space-x-2 text-gray-400">
            <div>
              <img src={star} alt="" className="w-5" />
            </div>
            <div>{hasilRating.toFixed(1)}</div>
            <div> | </div>
            <div>Sisa {data.stock} stock</div>
          </div>
        </div>
      </>
    );
  };

  return (
    <Fragment>
      <div>
        <div className="basic-1/4 m-4">
          <div className="rounded-md p-2 shadow-md shadow-cyan-400 w-60">
            {data.stock !== 0 ? viewWithLink() : viewWithoutLink()}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RightSide;
