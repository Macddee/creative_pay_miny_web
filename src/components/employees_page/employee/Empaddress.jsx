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
      <div className="bg-blue-100 max-w-[1300px] p-5 md:p-15 py-10 rounded-lg w-[95%] relative block mt-1 m-auto">
        {/* <h1 className="text-3xl text-center font-bold">Update Employeee Details</h1> */}
        <form onSubmit={handleSubmit} >
          <div className="md:flex gap-20 flex-wrap">
            <div className="flex-1">
              <div className="flex flex-col">
                <div className="md:flex w-full gap-10">
                  <Input
                    title="Postal Line 1"
                    value={data.empPost1}
                    type="text"
                    inputId="empPost1"
                    name="empPost1"
                    placeholder="Postal Line 1"
                    onChange={handleChange} />
                  <Input
                    title="Postal Line 2"
                    value={data.empPost2}
                    type="address"
                    inputId="empPost2"
                    name="empPost2"
                    placeholder="Postal Line 2"
                    onChange={handleChange} />
                </div>
                <div className="md:flex w-full gap-10">
                  <Input
                    title="Postal Line 3"
                    value={data.empPost3}
                    type="text"
                    inputId="empPost3"
                    name="empPost3"
                    placeholder="Postal Line 3"
                    onChange={handleChange} />
                  <Input
                    title="Postal Line 4"
                    value={data.empPost4}
                    type="text"
                    inputId="empPost4"
                    name="empPost4"
                    placeholder="Postal Line 4"
                    onChange={handleChange} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ flex: '0 0 48%' }}>
                    <Input
                      title="Postal Line 5"
                      value={data.empPost5}
                      type="text"
                      inputId="empPost5"
                      name="empPost5"
                      placeholder="Postal Line 5"
                      onChange={handleChange} />
                  </div>
                </div>

              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}