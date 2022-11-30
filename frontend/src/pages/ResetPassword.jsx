import { useState } from "react";
import axios from "../api/axios";
import toast, { Toaster } from "react-hot-toast";

const { ValidateEmail } = require("../utils/helpers");

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [errEmail, setEmailErr] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // validate the email
    if (ValidateEmail(email)) {
      try {
        const data = await axios.post(
          "http://localhost:4000/api/auth/forgetpassword",
          JSON.stringify({ email }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (data.status == "200") {
          toast.success(data.data);
          setEmailErr("");
        }
      } catch (error) {
        toast.error(error.response.data);
        setEmailErr("");
      }
    } else setEmailErr("Invalid email format!");
  };
  return (
    <div className="flex min-h-full items-center justify-center py-12 m:px-6 lg:px-8">
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm 	 mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 bg-amber-100	 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-4xl font-bold	 text-center">
              Reset Password
            </h1>
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
              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-blue-900 text-white hover:bg-green-dark focus:outline-none my-1"
              >
                Check
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default ResetPassword;
