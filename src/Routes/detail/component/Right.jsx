import React, { Fragment } from "react";
import { useState } from "react";
import arrow_b from "../../../assets/arrow-b.png";
import arrow_t from "../../../assets/arrow-t.png";
import minus from "../../../assets/minus.png";
import plus from "../../../assets/plus.png";
import RadioButton from "../component/RadioButton";
import Cookies from "js-cookie";

function Right({ color, product }) {
  const [stock, setStock] = useState(0);
  const [totalHargaBarang, setTotalHargaBarang] = useState(0);
  const [totalHargaDiscount, setTotalHargaDiscount] = useState(0);
  const [firstStatus, setFirstStatus] = useState(true);
  const [secondStatus, setSecondStatus] = useState(true);

  const [rbSelected, setRbSelected] = useState("");

  const user = Cookies.get("user") && JSON.parse(Cookies.get("user"));
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  const disc = (price, disc) => {
    let hasil = (price / 100) * disc;
    return hasil;
  };

  const handlePlusOrder = () => {
    if (stock < product.stock) {
      setStock(stock + 1);

      var num1 = totalHargaBarang + product.price;
      var num2 = totalHargaDiscount + disc(product.price, product.discount);
      setTotalHargaBarang(num1);
      setTotalHargaDiscount(num2);
    }
  };

  const handleMinusOrder = () => {
    if (stock > 0) {
      setStock(stock - 1);
      var num1 = totalHargaBarang - product.price;
      var num2 = totalHargaDiscount - disc(product.price, product.discount);
      setTotalHargaBarang(num1);
      setTotalHargaDiscount(num2);
    }
  };

  const handleFirstStatus = () => {
    firstStatus ? setFirstStatus(false) : setFirstStatus(true);
  };

  const handleSecondStatus = () => {
    secondStatus ? setSecondStatus(false) : setSecondStatus(true);
  };

  const handleRbSelected = (rb) => {
    setRbSelected(rb);
    console.log(rb);
  };

  const handleClickBuy = () => {
    if (stock === 0 && !rbSelected) {
      return alert("Silahkan Masukan Jumlah dan warna Yang ingin Dibeli");
    }
    if (!rbSelected) {
      return alert("Silahkan Pilih Warna");
    }
    if (stock === 0) {
      return alert("Silahkan Masukan Jumlah Yang ingin Dibeli");
    }
  };

  const handleClickAddCart = () => {
    if (stock === 0 && !rbSelected) {
      return alert("Silahkan Masukan Jumlah dan warna Yang ingin Dibeli");
    }
    if (!rbSelected) {
      return alert("Silahkan Pilih Warna");
    }
    if (stock === 0) {
      return alert("Silahkan Masukan Jumlah Yang ingin Dibeli");
    }
  };

  const ColorView = () => {
    return (
      <>
        <div>
          <div className="flex flex-row justify-between">
            <p className="text-lg font-semibold">Pilih Warna</p>
            <img
              src={firstStatus ? arrow_t : arrow_b}
              className="w-5"
              onClick={handleFirstStatus}
            />
          </div>
          <div
            className={firstStatus ? "mt-2 py-3" : "mt-2 py-3 h-0 invisible"}
          >
            <RadioButton
              color={color}
              onChangeRb={(value) => handleRbSelected(value)}
            />
          </div>
        </div>
      </>
    );
  };

  const buttonBuy = () => {
    return (
      <>
        <div className="mt-3 flex flex-row justify-between">
          <div
            className={
              rbSelected && stock !== 0
                ? "border-solid border-2 border-cyan-400 p-2 rounded-xl cursor-copy"
                : "border-solid border-2 border-cyan-400 p-2 rounded-xl cursor-not-allowed"
            }
          >
            <p className="text-cyan-400 font-semibold" onClick={handleClickBuy}>
              Beli Langsung
            </p>
          </div>
          {/*  */}
          <div
            className={
              rbSelected !== "" && stock !== 0
                ? "bg-cyan-400 rounded-xl p-2 cursor-copy"
                : "bg-cyan-400 rounded-xl p-2 cursor-not-allowed"
            }
          >
            <p className="text-white" onClick={handleClickAddCart}>
              + Keranjang
            </p>
          </div>
        </div>
      </>
    );
  };

  const buttonLogin = () => {
    return (
      <>
        <p className="border-solid border-2 border-cyan-400 p-2 rounded-xl text-cyan-400 text-center">
          Login
        </p>
      </>
    );
  }

  return (
    <Fragment>
      <form>
        {color && ColorView()}
        <div>
          <div className="flex flex-row justify-between">
            <p className="text-md font-semibold">Atur Jumlah Dan Catatan</p>
            <img
              src={secondStatus ? arrow_t : arrow_b}
              className="w-5"
              onClick={handleSecondStatus}
            />
          </div>
          <div className={secondStatus ? "" : "h-0 invisible"}>
            <div className="mt-2 py-3 flex flex-row space-x-4">
              <div className="flex flex-row space-x-4 border-solid border-2 border-cyan-400 overflow-x-hidden px-3 py-1">
                <div onClick={handleMinusOrder}>
                  <img src={minus} className="w-4" />
                </div>
                <div>{stock}</div>
                <div onClick={handlePlusOrder}>
                  <img src={plus} className="w-4" />
                </div>
              </div>
              <div className="flex flex-row mt-1">
                <p className="text-gray-500">Stok : </p>
                <p>{product.stock}</p>
              </div>
            </div>
            <div className="mt-3">
              <textarea
                placeholder="Contoh Catatan: Warna, Size"
                className="w-full h-11 p-3 rounded-lg shadow-sm shadow-gray-500 focus:border-solid focus:border-sky-500"
              ></textarea>
            </div>
          </div>
          <div className="mt-4 flex flex-row justify-between">
            <p className="text-gray-400 mt-1">Total Harga ( {stock} barang)</p>
            <p className="text-1xl font-semibold text-gray-400">
              {rupiah(totalHargaBarang)}
            </p>
          </div>
          <div className="mt-3 flex flex-row justify-between">
            <p className="text-gray-400 mt-1">Total Discount</p>
            <p className="text-1xl font-semibold text-gray-400">
              - {rupiah(totalHargaDiscount)}
            </p>
          </div>
          <div className="mt-3 flex flex-row justify-between">
            <p className="text-gray-700 mt-1 font-semibold">Total Harga</p>
            <p className="text-1xl font-semibold text-gray-700">
              {rupiah(totalHargaBarang - totalHargaDiscount)}
            </p>
          </div>
          <div className="mt-3">
            {user ? buttonBuy() : buttonLogin()}
          </div>
        </div>
      </form>
    </Fragment>
  );
}

export default Right;
