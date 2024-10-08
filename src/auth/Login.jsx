import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import Choosepayrol from "../components/Choosepayrol";
import { useDataContexts } from "../ContextProviders/DataContexts";
import Loading from "../components/Loading";

export default function Login() {
  const{
      login,
    } = useAuth()

  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const [user, setUser] = useState({
    user_email: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      await login(user)
      document.getElementById('ChoosePayrol').showModal()

    } catch (error) {
      console.log(error)
      setErrorMsg("error.@")
      console.log(errorMsg)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div>
    
        {loading ? (
          < Loading />
        ) : (
          <>
          <div className="flex items-center justify-center h-[100vh]">
          <div className="bg-mint-cream max-w-[500px] shadow-lg p-5 rounded-lg w-[90%] md:w-[50%] block m-auto">
            <h1 className="text-3xl text-center mb-5 font-bold">Sign In</h1>
            <form onSubmit={handleLogin}>
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
                  value={user.email}
                  id="email"
                  name="user_email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  placeholder="Your Email..."
                  required />
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
                  required />
              </div>

              {/* {showError &&
                <div className="pb-6 pt-3">
                  <Error message={errorMsg.message} />
                </div>
              } */}

              <button
                type="submit"
                className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 block mx-auto"
              >
                Login
              </button>

            </form><p className="text-center mt-4">
              Don't Have an Account? {/* link to register  */}
              <Link to="/signup" className="text-royal-blue">
                Register
              </Link>
            </p>
            </div>
            </div>
          </>
        )}
      

      {/* {showPayrollSelection
      ? document.getElementById('ChoosePayrol').showModal()
      : ""
      } */}
      <Choosepayrol />
    
    </div>
  )
}
