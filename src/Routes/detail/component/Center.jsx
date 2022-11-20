import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import star from "../../../assets/icon_star.png";

function Center({ product, ulasan }) {

  const [rating, setRating] = useState(0);

  useEffect(() => {
      let num = 0;
      ulasan?.map((item) => (num += item.score));

      setRating(num / ulasan.length);
  }, []);

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

  const ViewPriceWithDisc = () => {
    return (
      <>
        <p className="text-4xl font-bold">
          {rupiah(CountDisc(product.price, product.discount))}
        </p>
        <div className="flex flex-row mt-2">
          <div className="mr-2 overflow-y-hidden bg-cyan-300 p-1 rounded-md shadow-md shadow-cyan-200 text-white">
            {product.discount}%
          </div>
          <div className="line-through p-1 text-gray-500">
            {rupiah(product.price)}
          </div>
        </div>
      </>
    );
  };

  const ViewPriceWithoutDisc = () => {
    return (
      <>
        <p className="text-4xl font-bold">{rupiah(product.price)}</p>
      </>
    );
  };

  return (
    <Fragment>
      <p className="font-bold text-4xl">{product.title}</p>
      <div className="flex flex-row mt-4 space-x-2">
        <p>Terjual</p>
        <p className="text-gray-400">100+</p>
        <p>.</p>
        <div>
          <img src={star} alt="" className="w-5" />
        </div>
        <p>{rating.toFixed(1)}</p>
        <p className="text-gray-400">({ulasan.length} ulasan)</p>
      </div>
      <div className="my-6">
        {product.discount === 0 ? (
          <ViewPriceWithoutDisc />
        ) : (
          <ViewPriceWithDisc />
        )}
      </div>
      <div className="pt-2">
        <p className="text-2xl text-center font-extralight text-cyan-400">
          Detail
        </p>
        <div className="border-solid border-b-4 border-cyan-200"></div>
      </div>
      <div className="py-4">
        <p>{product.description}</p>
      </div>
    </Fragment>
  );
}

export default Center;
