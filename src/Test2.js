import axios from "axios";
import React, { Component } from "react";

class Test2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => this.setState({ data: res.data.data }))
      .catch((err) => console.log(err));
  }

  render() {
    const { data } = this.state;
    return (
      <>
        {data?.map((item, i) => (
          <p key={i}>{item.title}</p>
        ))}
      </>
    );
  }
}

export default Test2;
