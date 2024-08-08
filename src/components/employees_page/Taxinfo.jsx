import React, { useState, useEffect } from "react";
import Input from "../../styled/inputs";

export default function Taxinfo() {
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
        {/* <h1 className="text-3xl text-center mb-5 font-bold">Update Employeee Details</h1> */}
        <form onSubmit={handleSubmit}>
          <div className="md:flex gap-20 flex-wrap">
            <div className="flex-1">
              <div className="mt-10">
                <div className="flex flex-col">
                  <div className="md:flex w-full gap-10">
                    <Input
                      title="Tax Code"
                      value={data.taxCode}
                      type="text"
                      inputId="taxCode"
                      name="taxCode"
                      placeholder="Tax Code"
                      onChange={handleChange} />
                    <Input
                      title="Directive NUmber"
                      value={data.taxDN}
                      type="text"
                      inputId="taxDN"
                      name="taxDN"
                      placeholder="Directive Number"
                      onChange={handleChange} />
                  </div>
                  <div className="md:flex w-full gap-10">
                    <Input
                      title="Tax Dependance"
                      value={data.taxDependance}
                      type="text"
                      inputId="taxDependance"
                      name="taxDependance"
                      placeholder="Tax Dependances"
                      onChange={handleChange} />
                    <Input
                      title="Amount"
                      value={data.taxAmt}
                      type="currency"
                      inputId="taxAmt"
                      name="taxAmt"
                      placeholder="$0.00"
                      onChange={handleChange} />
                  </div>
                  <div className="md:flex w-full gap-10">
                    <Input
                      title="Percentage"
                      value={data.taxPerc}
                      type="Number"
                      inputId="taxOffice"
                      name="taxOffice"
                      placeholder="Tax Office"
                      onChange={handleChange} />
                    <Input
                      title="Tax Office"
                      value={data.taxOffice}
                      type="text"
                      inputId="taxOffice"
                      name="taxOffice"
                      placeholder="Tax Office"
                      onChange={handleChange} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: '0 0 48%' }}>
                      <Input
                        title="References"
                        value={data.taxRef}
                        type="text"
                        inputId="taxRef"
                        name="taxRef"
                        placeholder="References"
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