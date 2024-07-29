import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

import Input from "../../../styled/inputs"

export default function HomeEmploy() {
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

noo i dont wanna go ahhhh, you are too ugly!

  const handleSubmit = (e) => {

  }
  return (
    <>
      <div className="bg-[#ffffff] max-w-[1300px] p-5  md:p-15 py-10 rounded-lg w-[95%] relative block mt-10 m-auto ">
        <h1 className="text-3xl text-center mb-5 font-bold">Update Employeee Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="md:flex gap-20 flex-wrap">
            <div className="flex-1">

              <div className="mt-10">
                <div className="flex flex-col">
                  <div className="md:flex w-full gap-10">
                    <Input
                      title="Employee Number"
                      value={data.empNumber}
                      type="text"
                      inputId="empNumber"
                      name="empNumber"
                      placeholder="Employee Number"
                      onChange={handleChange} />
                    <Input
                      title="Title"
                      value={data.title}
                      type="text"
                      inputId="title"
                      name="title"
                      placeholder="Title"
                      onChange={handleChange} />
                  </div>

                  <div className="md:flex w-full gap-10">
                    <Input
                      title="Surname"
                      value={data.empSurname}
                      type="text"
                      inputId="surname"
                      name="surname"
                      placeholder="Surname"
                      onChange={handleChange} />
                    <Input
                      title="Spouse Name"
                      value={data.spouse}
                      type="text"
                      inputId="spouse"
                      name="spouse"
                      placeholder="Spouse"
                      onChange={handleChange} />
                  </div>

                  <div className="md:flex w-full gap-10">
                    <Input
                      title="Names"
                      value={data.empSpouse}
                      type="text"
                      inputId="names"
                      name="names"
                      placeholder="Names"
                      onChange={handleChange} />
                    <Input
                      title="Passport Number"
                      value={data.idNum}
                      type="text"
                      inputId="idNum"
                      name="idNum"
                      placeholder="XX-XXXXXXX Y XX"
                      onChange={handleChange} />
                  </div>

                  <div className="md:flex w-full gap-10">
                    <Input
                      title="Birth Date"
                      value={data.empBirthday}
                      type="date"
                      inputId="bdate"
                      name="nbdate"
                      placeholder="Birthday"
                      onChange={handleChange} />
                    <Input
                      title="Contract End Date"
                      value={data.contractEnd}
                      type="date"
                      inputId="end"
                      name="end"
                      placeholder="Contract end date"
                      onChange={handleChange} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: '0 0 48%' }}>
                      <Input
                        title="Initials"
                        value={data.initials}
                        type="text"
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
          >
            Submit
          </button>
        </form>
      </div></>
  );
}