import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "./redux/authSlice";
import { toast } from "react-toastify";


export default function Register() {
  const [data, setData] = useState({
    username: "",
    user_email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      // toast.success(message)
      navigate("/login");
      toast.success("Registered Successifully");
    }

    dispatch(reset());
  }, [user, isError, message, isSuccess, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
     
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="bg-mint-cream shadow-lg p-5 max-w-[500px] rounded-lg w-[90%] md:w-[50%] block m-auto">
        <h1 className="text-3xl text-center mb-5 font-bold">Register</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Username
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={data.username}
              id="username"
              name="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="Your Username..."
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={data.user_email}
              id="email"
              name="user_email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="Your Email..."
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              value={data.password}
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="Your Password..."
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Confirm Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              value={data.confirmPassword}
              id="email"
              name="confirmPassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="Re-enter Your Password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-black w-full p-2.5 text-mint-cream rounded-lg"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already Have an Account?{" "}
          <Link to="/login" className="text-royal-blue">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
