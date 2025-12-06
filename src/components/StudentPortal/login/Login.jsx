import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/NewGate_logo_III.png";
import loader from "../../assets/loader.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useSession } from "../../../context/session";
function Login() {
  const [data, setData] = useState({
    matricNumber: "",
    password: "",
  });
  const { updateSessionData } = useSession();

  const { matricNumber, password } = data;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();
    try {
      if (password === "admin") {
        setLoading(false);

        updateSessionData("loggedIn");
        navigate("/");
      } else {
        setLoading(false);

        setErrors(`Incorrect Password Please try again`);
      }
    } catch (error) {
      setLoading(false);

      setErrors(`${error.response.data.message} Please try again`);
    }
  };

  return (
    <div className="p-[2rem]">
      <img src={logo} className="w-[80px] m-auto" alt="Logo" />
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1 className="text-[2rem] font-[500]">Enter Your Password!</h1>
          <p className=" text-gray-500 text-center mt-2">
            Welcome back! Please enter your Details!
          </p>
          {<p className="text-red-500 text-center w-full my-4"> {errors}</p>}
          <div className="grid gap-8 mt-8">
            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                required
                value={password}
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="********"
                className="w-full px-4 py-2 border rounded"
              />
              {/* <FaLock className="absolute right-5 top-1/2 transform -translate-y-1/2" /> */}
            </div>
          </div>

          <button
            className="flex justify-center items-center blue_btn gap-[1rem] w-full mt-6"
            onClick={handleSubmit}
            type="submit"
            disabled={loading}
          >
            {loading && (
              <img src={loader} className="w-[20px] h-[20px] " alt="Logo" />
            )}
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
