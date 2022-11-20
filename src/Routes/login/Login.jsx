import React, { Fragment, useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import InputField from "./component/InputField";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { updateUser } from "../../redux/features/stmSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setNama] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [notMatchParam, setNotMatchParam] = useState(true);

  // const dispatch = useDispatch();
  let navigate = useNavigate();

  const clientId =
    "849069995008-ug6uo56i486hhde7rqrssoefsm4255ps.apps.googleusercontent.com";
  // const key = "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";

  useEffect(() => {
    if (passwordConfirm) {
      if (passwordConfirm !== password) {
        return setNotMatchParam(false);
      }
      return setNotMatchParam(true);
    }
  }, [passwordConfirm]);

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const onSuccess = async (res) => {
    Swal.fire({
      title: "Mohon Tunggu !",
      html: "Proses...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: async () => {
        Swal.showLoading();
        await axios
          .post("http://localhost:4000/api/user/loginWithGmail", {
            data: JSON.stringify(res.profileObj),
          })
          .then((ress) => {
            const data = ress.data.data;
            const con = ress.data;
            if (con.status_code === 404) {
              return onFailureSWA("Your Gmail Has Been Registered");
            }
            return onSuccessSWA(data, ress);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  };

  const handleFormLogin = async (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Mohon Tunggu !",
      html: "Proses...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: async () => {
        Swal.showLoading();
        await axios
          .post("http://localhost:4000/api/user/login", {
            email: usernameLogin,
            password: passwordLogin,
          })
          .then((res) => {
            const data = res.data.data;
            const con = res.data;
            if (con.status_code === 400 || con.status_code === 404) {
              return onFailureSWA("Your Username / Password Is Incorrect");
            }
            // console.log(res);
            return onSuccessSWA(data, res);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  };

  const handleFormCreateAccount = async (event) => {
    event.preventDefault();
    notMatchParam === true
      ? Swal.fire({
          title: "Mohon Tunggu !",
          html: "Proses...",
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: async () => {
            Swal.showLoading();
            await axios
              .post("http://localhost:4000/api/user/createAccount", {
                nama: name,
                email: email,
                password: password,
                telp: noTelp,
              })
              .then((res) => {
                const data = res.data.data;
                const con = res.data;
                if (con.status_code === 404) {
                  return onFailureSWA(con.message);
                }
                // console.log(data)
                return onSuccessSWA(data, res);
              });
          },
        })
      : Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password Not Matched",
        });
  };

  const onFailureSWA = ({ err }) => {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err,
    });
  };

  const onSuccessSWA = ( data, res ) => {
    // console.log(data);
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Welcome in Our Website",
    }).then((e) => {
      Cookies.set("user", JSON.stringify(data));
      Cookies.set("token", res.data.token);
      setLoading(false);
      navigate("/");
    });
  };

  return (
    <Fragment>
      <div className="w-full h-screen bg-gray-100 flex flex-row justify-around">
        <div className="w-80 h-fit bg-white rounded-lg shadow-md p-3 mt-10">
          <p className="text-2xl font-semibold flex justify-center">Login</p>
          <div className="mt-4">
            <form onSubmit={handleFormLogin}>
              <InputField
                text={"Email"}
                type={"email"}
                onChange={(e) => setUsernameLogin(e)}
                id="usernameLogin"
              />
              <InputField
                text={"Password"}
                type={"password"}
                onChange={(e) => setPasswordLogin(e)}
                id="passwordLogin"
              />
              <button
                type="submit"
                className="bg-gray-300 w-full h-10 rounded-lg shadow-md mt-8 font-semibold"
              >
                Sign In
              </button>
            </form>
            <Fragment>
              <div>
                <GoogleLogin
                  className="bg-gray-300 w-full h-10 rounded-lg shadow-md my-6 font-semibold flex flex-row justify-center pt-2"
                  clientId={clientId}
                  buttonText="Sign in with Google"
                  onSuccess={onSuccess}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </Fragment>
          </div>
        </div>
        <div className="w-96 h-fit my-10 p-3 rounded-lg shadow-md  bg-white">
          <p className="text-2xl font-semibold flex justify-center">
            Create Account
          </p>
          <div className="mt-4">
            <form onSubmit={handleFormCreateAccount}>
              <InputField
                text={"Nama"}
                type={"text"}
                onChange={(e) => setNama(e)}
                key="Nama"
              />
              <InputField
                text={"Nomor Telpon"}
                type={"number"}
                onChange={(e) => setNoTelp(e)}
                key="nomor_telpon"
              />
              <InputField
                text={"Email"}
                type={"email"}
                onChange={(e) => setEmail(e)}
                id="Email"
              />
              <InputField
                text={"Password"}
                type={"password"}
                onChange={(e) => setPassword(e)}
                id="password"
              />
              <InputField
                text={"Confirm Password"}
                type={"password"}
                onChange={(e) => setPasswordConfirm(e)}
                key="Confirm_Password"
              />
              {passwordConfirm && notMatchParam === false && (
                <p className="mx-1 text-xs text-pink-700">Password Not Match</p>
              )}
              <button className="bg-gray-300 w-full h-10 rounded-lg shadow-md my-8 font-semibold">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
