import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Fragment>
      <Link to='/'>
        <p className="text-3xl text-cyan-500 font-semibold">Jholexy</p>
      </Link>
    </Fragment>
  );
}

export default Logo;
