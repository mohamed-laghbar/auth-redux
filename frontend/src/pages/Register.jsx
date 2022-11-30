import React, { useState } from "react";
import axios from "../api/axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate} from 'react-router-dom';

const {
  ValidateEmail,
  validatePassword,
  validateName,
} = require("../utils/helpers");

const Register = () => {

  const navigate = useNavigate()
  const [errName, setErrName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errConfPassword, setErrConfPassword] = useState("");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // validate the email
    if (!ValidateEmail(email)) {
      setErrEmail("Invalid email format");
    } else setErrEmail("");
    // validate the password
    if (!validatePassword(password)) {
      setErrPassword("Password must be more then 6 caracteres");
    } else setErrPassword("");

    if (!validateName(name)) {
      setErrName("Invalid name format");
    } else setErrName("");

    if (password !== confPassword) {
      setErrConfPassword("Password do not match");
    } else setErrConfPassword("");

    if (
      errEmail === "" &&
      errName === "" &&
      email !== "" &&
      errPassword === ""
    ) {
      const data = await axios.post(
        "http://localhost:4000/api/auth/register",
        JSON.stringify({ name, email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      if (data.status=='201') {
        toast.success(data.data);
        setTimeout(() => {
          navigate('/login')
          
        }, 3000);
        
      } 
      
      else toast.success(data.data);

    }
  };
  return (
    <div className="flex min-h-full items-center justify-center py-12 m:px-6 lg:px-8">
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm 	 mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 bg-amber-100	 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Register</h1>
            <form onSubmit={handleSubmit}>
              <input
                onChange={(event) => setName(event.target.value)}
                value={name}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="name"
                placeholder="Full Name"
              />
              {errName ? (
                <div
                  className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                  role="alert"
                >
                  {" "}
                  {errName}
                </div>
              ) : (
                ""
              )}
              <input
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                type="email"
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
              <input
                onChange={(event) => setConfPassword(event.target.value)}
                value={confPassword}
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirm_password"
                placeholder="Confirm Password"
              />
              {errConfPassword ? (
                <div
                  className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                  role="alert"
                >
                  {" "}
                  {errConfPassword}
                </div>
              ) : (
                ""
              )}
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-blue-900 text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Create Account
              </button>
            </form>
            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a
                className="no-underline border-b border-grey-dark text-blue-900"
                href="/"
              >
                <span> </span> Terms of Service
              </a>
              <span> and </span>
              <a
                className="no-underline border-b border-grey-dark text-blue-900	"
                href="/"
              >
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="text-grey-dark mt-6">
            Already have an account ?
            <a
              className="no-underline border-b border-blue text-red-900"
              href="/login"
            >
              <span> </span>Log in
            </a>
            .
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
