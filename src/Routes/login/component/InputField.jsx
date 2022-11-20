import React, { Fragment } from "react";

const InputField = ({ text, type, onChange, id }) => {
  return (
    <Fragment>
      <label htmlFor={text} className="block my-3">
        <span className="block font-semibold mb-1 text-slate-700 after:content-['*'] after:text-pink-500 after:ml-0.5">
          {text}
        </span>
        <input
          id={id}
          type={type}
          placeholder={text}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 shadow-md shadow-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
          required
        />
      </label>
    </Fragment>
  );
};

export default InputField;
