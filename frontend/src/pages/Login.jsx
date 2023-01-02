import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "../api/axios";
const { ValidateEmail, validatePassword } = require("../utils/helpers");

const Login = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setEmailErr] = useState("");
  const [errPassword, setPasswordErr] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // validate the email
    if (!ValidateEmail(email)) {
      setEmailErr("Invalid email format!");
    } else setEmailErr("");
    // validate the password
    if (!validatePassword(password)) {
      setPasswordErr("Password must be more then 6 caracteres");
    } else setPasswordErr("");

    if (ValidateEmail(email) && validatePassword(password)) {
      try {
        const data = await axios.post(
          "http://localhost:4000/api/auth/login",
          JSON.stringify({ email, password }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (data.status == "200") {
          toast.success('You are logged in ');
          console.log(data);
          navigate("/home");
        }
      } catch (error) {
        console.log(error.response.data);

        if (error.response.status == "401") {
          toast.success(error.response.data);
          console.log(error.response.data);
        } else if (error.response.status == "403") {
          toast.error(error.response.data);
        }
      }
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 m:px-6 lg:px-8">
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm 	 mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 bg-amber-100	 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-4xl font-bold	 text-center">Login</h1>
            <form onSubmit={handleSubmit}>
              <input
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
              />
              {errEmail ? (
                <div
                  className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                  role="alert"
                >
                  {" "}
                  {errEmail}
                </div>
              ) : (
                ""
              )}
              <input
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
              />
              {errPassword ? (
                <div
                  className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                  role="alert"
                >
                  {" "}
                  {errPassword}
                </div>
              ) : (
                ""
              )}

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-blue-900 text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Login
              </button>
            </form>

            <div className="text-center text-sm text-grey-dark mt-4">
              {" "}
              Did you forget your password, Don't worry{" "}
              <a
                className="no-underline border-b border-grey-dark text-blue-900"
                href="/resetpassword"
              >
                {" "}
                <span> </span> Reset from here{" "}
              </a>{" "}
            </div>
            <div className="text-center text-sm text-grey-dark mt-4">
              {" "}
              You don't have account ?{" "}
              <a
                className="no-underline border-b border-grey-dark text-blue-900"
                href="/register"
              >
                {" "}
                <span> </span> Register Now!{" "}
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};
export default Login;
