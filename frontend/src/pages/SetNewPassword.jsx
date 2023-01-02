import { useState } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SetNewPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await axios.post(
        `http://localhost:4000/api/auth/resetpassword/${token}`,
        JSON.stringify({ password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.data);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 m:px-6 lg:px-8">
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm 	 mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 bg-amber-100	 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-4xl font-bold	 text-center">
              Reset Password
            </h1>
            <form method="post" onSubmit={handleSubmit}>
              <input
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="set New Password"
              />

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

export default SetNewPassword;
