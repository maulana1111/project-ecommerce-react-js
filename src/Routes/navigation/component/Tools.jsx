import React, { Fragment } from "react";
import person from "../../../assets/person.png";
// import { useDispatch } from "react-redux";
// import { updateUser } from "../../../redux/features/stmSlice";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Tools() {
  // const dt = ;
  const user = Cookies.get("user") && JSON.parse(Cookies.get("user"));
  let navigate = useNavigate();
  // console.log(Cookies.get("user"));
    // Cookies.remove("user");

  const handleLogout = () => {
    Cookies.remove("user");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "You Have Been Log Out",
      showConfirmButton: false,
      timer: 1500,
    }).then((e) => {
      navigate("/");
    });
  };

  const viewLoggedIn = () => {
    return (
      <>
        <div className="flex flex-row mx-4 mr-7">
          <img src={person} className="w-8 h-7 mt-2" />
          <p className="mt-2 ml-3 text-lg">{user.name}</p>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 bg-cyan-400 rounded-md shadow-md shadow-cyan-300 text-white m-1"
        >
          Logout
        </button>
      </>
    );
  };

  const viewLoggedOut = () => {
    return (
      <>
        <Link to="login">
          <button className="p-2 bg-cyan-400 rounded-md shadow-md shadow-cyan-300 text-white m-1">
            Login
          </button>
        </Link>
      </>
    );
  };

  return (
    <Fragment>
      <div className="flex flex-row">
        <div className="m-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
        <div className="m-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </div>
        <div className="m-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
            />
          </svg>
        </div>
        <div className="flex flex-row">
          {user ? viewLoggedIn() : viewLoggedOut()}
        </div>
      </div>
    </Fragment>
  );
}

export default Tools;
