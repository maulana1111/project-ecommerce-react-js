import React, { Fragment } from "react";
import { useState } from "react";
import gb from "../../../assets/product.jpg";

function Left(props) {
  const { image } = props;
  const base = image[0]?.image_name;
  const [baseImage, setBaseImage] = useState(base)

  // useEffect(() => {
  //   (baseImage != base) ?  
  // }, [baseImage]);
  
  const handleChangeImage = (image) => {
    setBaseImage(image)
  }

  return (
    <Fragment>
      <img src={"./product/"+baseImage} className="w-full rounded-xl" />
      <div className="my-4 p-2 flex flex-row overflow-x-scroll ">
        {image?.map((item, i) => (
          // {console.log(item.image_name)}
          <img
            onMouseOver={() => handleChangeImage(item.image_name)}
            src={"./product/" + item.image_name}
            // src="./product/product-1.jpg"
            className="w-20 rounded-md mx-1 border-solid border-2 border-cyan-400"
            key={i}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default Left;
