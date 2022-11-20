import React, { Fragment } from "react";
import Logo from "./component/Logo";
import SearchBar from "./component/SearchBar";
import Tools from "./component/Tools";
import { Outlet, Link } from "react-router-dom";
import "./nav.css";

function Navigation() {
  return (
    <Fragment>
      <div className="shadow-sm shadow-cyan-200 p-6 overflow-hidden md:h-24 ">
        <div className="flex flex-row justify-between ">
          <div>
            <Logo />
          </div>
          <div className="w-64 invisible md:visible">
            <SearchBar />
          </div>
          <div>
            <Tools />
          </div>
        </div>
        <div className="mt-3 visible md:invisible">
          <SearchBar />
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
