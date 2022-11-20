import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import useSWR from "swr";

function Test() {
  const [data, setData] = useState([]);
  const fatcher = (url) => axios.get(url).then((res) => res.data);
  useSWR("http://127.0.0.1:4000/api/products", fatcher, {
    onSuccess: (data) => setData(data.data),
  });

  useEffect(() => {
    if (data !== null) {
      console.log("hit1");
      if (data === data) {
        console.log("hit2");
        alert("data terbaru masuk");
      }
    }
  }, [data]);

  return (
    <div>
      {data?.map((item, i) => (
        <p key={i}>{item.data.title}</p>
      ))}
    </div>
  );
}

export default Test;
