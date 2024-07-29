import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

import Input from "../../../styled/inputs"

export default function Empaddress() {
  const [data, setData] = useState({
    eventName: "",
    description: '',
    location: "",
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };



  const handleSubmit = (e) => {

  }
  return (
    <>
      <div className="bg-[#ffffff] max-w-[1300px] p-5  md:p-20 py-10 rounded-lg w-[95%] relative block mt-10 m-auto">
        <h1 className="text-3xl text-center mb-5 font-bold">Update Employeee Contact Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="md:flex gap-20 flex-wrap">
            <div className="flex-1">

              <div className="mt-10">
                <div className="flex flex-col">
                  <div className="md:flex w-full gap-10">
                    <Input
                      title="Home Number"
                      value={data.empHome}
                      type="text"
                      inputId="empHome"
                      name="empHome"
                      placeholder="Home Number"
                      onChange={handleChange} />
                    <Input
                      title="Mobile Number"
                      value={data.empMobile}
                      type="number"
                      inputId="mobile"
                      name="mobile"
                      placeholder="Mobile Number"
                      onChange={handleChange} />
                  </div>

                  <div className="md:flex w-full gap-10">
                    <Input
                      title="Business Number"
                      value={data.empBusiness}
                      type="number"
                      inputId="business"
                      name="business"
                      placeholder="Business Number"
                      onChange={handleChange} />
                    <Input
                      title="Email Address"
                      value={data.empEmail}
                      type="email"
                      inputId="email"
                      name="email"
                      placeholder="Email Address"
                      onChange={handleChange} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: '0 0 48%' }}>
                      <Input
                        title="Fax Number"
                        value={data.empFax}
                        type="number"
                        inputId="initials"
                        name="initials"
                        placeholder="initials"
                        onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-wide btn-accent"
            onClick={() => console.log("pressed")}
          >
            Submit
          </button>
        </form>
      </div></>
  );
}