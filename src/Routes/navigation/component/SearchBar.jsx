import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateSearchValue } from "../../../redux/features/stmSlice";
import { useSelector } from "react-redux";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const value = useSelector((state) => state.stm);
  
  useEffect(() => {
    setSearchValue(value.searchValue)
  }, [value.searchValue]);

  useEffect(() => {
    dispatch(updateSearchValue({ searchValue }))
  }, [searchValue]);

  return (
    <Fragment>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="username"
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Find Somthing Here"
      />
    </Fragment>
  );
}

export default SearchBar;
