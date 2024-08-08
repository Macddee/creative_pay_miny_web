import React, { useState, useEffect } from "react";
import Input from "../../../styled/inputs"

export default function Empstoppay() {
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
    console.log(data)
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
                    title="Stop From"
                    value={data.comStop}
                    type="date"
                    inputId="comStop"
                    name="comStop"
                    placeholder="XX/XX/20XX"
                    onChange={handleChange} />
                  <Input
                    title="Stop To"
                    value={data.comTo}
                    type="date"
                    inputId="comTo"
                    name="comTo"
                    placeholder="XX/XX/20XX"
                    onChange={handleChange} />
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
      </div></>
  );
}