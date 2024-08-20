import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "./auth";
import { useDataContexts } from "../ContextProviders/DataContexts";

export default function Register() {

  const {
    auth
  } = useAuth();
  
  const {
    showError, setShowError,
  } = useDataContexts();

  const [errorMesage, setErrorMessage] = useState("")
  

  
  const [user, setUser] = useState({
    username: "",
    user_email: "",
    password: "",
    confirmPassword: "",
  });  
  
    const handleChange = (e) => {
      setUser((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  
    const redirectPath = location.state?.path || "login"
  
    const handleSignup = async (event) => {
      event.preventDefault()
  
      try {
        await auth.signup(user)
        navigate(redirectPath, { replace: true })
        
      } catch (error) {
        setErrorMessage(error)
        setShowError(true)
      }
    }
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setShowError(true)
    }
  };

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
              value={user.username}
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
              value={user.user_email}
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
              value={user.password}
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
              value={user.confirmPassword}
              id="email"
              name="confirmPassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder="Re-enter Your Password"
              required
            />
          </div>

          {showError &&
              <div className="pb-6 pt-3">
                <Error message={errorMesage} />
              </div>
            }

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
