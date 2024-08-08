import React, { useState, useEffect } from "react";   
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

  const handleSubmit = (e) => {
    console.log(data)
  }
  return (
    <>
      <div className="bg-blue-100 max-w-[1300px] p-5  md:p-15 py-10 rounded-lg w-[95%] relative block mt-10 m-auto ">
        <h1 className="text-3xl text-center mb-5 font-bold">Company Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="md:flex gap-20 flex-wrap">
            <div className="flex-1">
              <div className="mt-10">
                <div className="flex flex-col">
                  <div className="md:flex w-full gap-10">
                    <Input
                      title="Cost Code"
                      value={data.comCode}
                      type="text"
                      inputId="comCode"
                      name="comCode"
                      placeholder="Cost Code"
                      onChange={handleChange} />
                    <Input
                      title="Pay Point"
                      value={data.comPP}
                      type="text"
                      inputId="comPP"
                      name="comPP"
                      placeholder="comPP"
                      onChange={handleChange} />
                  </div>
                  <div className="md:flex w-full gap-10">
                    <Input
                      title="Leave Code"
                      value={data.comLC}
                      type="text"
                      inputId="comLC"
                      name="comLC"
                      placeholder="comLC"
                      onChange={handleChange} />
                    <Input
                      title="Position"
                      value={data.comPosition}
                      type="text"
                      inputId="comPosition"
                      name="comPosition"
                      placeholder="comPosition"
                      onChange={handleChange} />
                  </div>
                  <div className="md:flex w-full gap-10">
                    <Input
                      title="Engagement Date"
                      value={data.comEngDate}
                      type="text"
                      inputId="comEngDate"
                      name="comEngDate"
                      placeholder="comEngDate"
                      onChange={handleChange} />
                    <Input
                      title="Occupation"
                      value={data.comOcc}
                      type="text"
                      inputId="comOcc"
                      name="comOcc"
                      placeholder="Sales Person"
                      onChange={handleChange} />
                  </div>

                  <div className="md:flex w-full gap-10">
                    <Input
                      title="Terminatation date"
                      value={data.comEnddate}
                      type="date"
                      inputId="comEnddate"
                      name="comEnddate"
                      placeholder="XX/XX/20XX"
                      onChange={handleChange} />
                    <Input
                      title="Department"
                      value={data.comDept}
                      type="date"
                      inputId="comDept"
                      name="comDept"
                      placeholder="Department"
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
            className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600"
          >
            Submit
          </button>
        </form>
      </div></>
  );
}