import React, { Fragment } from 'react'
import "./style.css";

function Category(props) {
  return (
    <Fragment>
      <button>
        <div className=" p-3 border-solid border-2 border-cyan-400 rounded-lg shadow-sm shadow-cyan-300 text-cyan-300 my-3 text-clip md:w-full w-max">
          {props}
        </div>
      </button>
    </Fragment>
  );
}

export default Category