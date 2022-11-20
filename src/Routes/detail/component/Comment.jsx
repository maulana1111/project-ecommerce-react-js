import React, { Fragment, useState, useEffect } from "react";
import star from "../../../assets/icon_star.png";
import Comment_item from "./Comment_item";

function Comment({ ulasan }) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    let num = 0;
    ulasan?.map((item) => (num += item.score));

    setRating(num / ulasan.length);
  }, []);
  return (
    <Fragment>
      <p className="text-center font-bold text-2xl">ULASAN PEMBELI</p>
      <div className="flex flex-row items-center justify-center mt-5 mb-10">
        <div>
          <img src={star} className="w-10" />
        </div>
        <div className="flex flex-row">
          <p className="text-7xl">{rating.toFixed(1)}</p>
          <p className="self-end text-gray-500">/5.0</p>
        </div>
      </div>
      <div className="my-4">
        {ulasan?.map((data, i) => (
          <Comment_item data={data} key={i} />
        ))}
      </div>
    </Fragment>
  );
}

export default Comment;
