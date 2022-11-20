import React, { Fragment } from 'react'
import Category from "../category/Category";
import { Link } from "react-router-dom";

function LeftBar(props) {
  const { data, onClickChange } = props; 
  // console.log(onClickChange);

  const handelClickButton = (valueId, valueTitle) => {
    onClickChange(valueId, valueTitle);
  }


  return (
    <Fragment>
      <button onClick={() => handelClickButton(data.id, data.category_title)}>
        <div className=" p-3 border-solid border-2 border-cyan-400 rounded-lg shadow-sm shadow-cyan-300 text-cyan-300 my-3 text-clip md:w-full w-max">
          {data.category_title}
        </div>
      </button>
    </Fragment>
  );
}

export default LeftBar