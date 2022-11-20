import React, { Fragment, useEffect } from "react";
import star from "../../../assets/icon_star.png";
import star_out from "../../../assets/star_outline.png";
import person from "../../../assets/person.png";

function Comment_item({ data }) {
  
  const handleLoopStarIn = (num) => {
    var starInView = [];
    for (var i = 0; i < num; i++) {
      starInView.push(<img src={star} alt="" className="w-6" key={i} />);
    }
    return starInView;
  };
  const handleLoopStarOut = (num) => {
    var starOutView = [];
    for (var i = 0; i < num; i++) {
      starOutView.push(<img src={star_out} alt="" className="w-6" key={i} />);
    }
    return starOutView;
  };

  return (
    <Fragment>
      <div className="my-8">
        <div className="flex flex-row">
          <div className="flex flex-row">
            {handleLoopStarIn(data.score)}
            {handleLoopStarOut(5 - data.score)}
          </div>
          <p className="ml-3 text-gray-400">{data.created_at}</p>
        </div>
        <div className="mt-6 flex flex-row">
          <img src={person} className="w-8" alt="" />
          <p className="text-lg font-semibold text-gray-500 ml-3">
            {data.name}
          </p>
        </div>
        <div className="mt-3">
          <p className="text-gray-500">
            {data.comment}
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default Comment_item;
