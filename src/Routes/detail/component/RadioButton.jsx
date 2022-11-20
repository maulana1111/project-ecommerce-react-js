import React, { Fragment } from "react";

function RadioButton({ color, onChangeRb }) {
  const handleClickChange = (e) => {
    onChangeRb(e.target.value);
  };

  return (
    <Fragment>
      {color?.map((item, i) => (
        <div className="form-check" key={i}>
          <input
            className="mr-2"
            type="radio"
            value={item.id}
            name="rb"
            onChange={(event) => handleClickChange(event)}
          />
          <label className="form-check-label" htmlFor="exampleRadios1">
            {item.color_name}
          </label>
        </div>
      ))}
    </Fragment>
  );
}

export default RadioButton;
