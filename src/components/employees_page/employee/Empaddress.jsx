import React, { useState, useEffect } from "react";
import Input from "../../../styled/inputs"
import { useDataContexts } from "../../../ContextProviders/DataContexts";

export default function Empaddress() {
  const {
    employeeDetails, setemployeeDetails,
    setAllEmployeeDetails,
    setShowPopupMsg,
  } = useDataContexts()


  const handleChange = (e) => {
    const { name, value } = e.target;

    setemployeeDetails((employee) => ({
      ...employee,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="bg-blue-100 max-w-[1300px] p-5 md:p-15 py-10 rounded-lg w-[95%] relative block mt-1 m-auto">
        {/* className="text-3xl text-center font-bold">Update Employeee Details */}
        <form>
          <div className="md:flex gap-20 flex-wrap">
            <div className="flex-1">
              <div className="flex flex-col">
                <div className="md:flex w-full gap-10">
                  <Input
                    title="Postal Line 1"
                    value={employeeDetails.Post_Line1 || ""}
                    type="text"
                    inputId="Post_Line1"
                    name="Post_Line1"
                    placeholder="Postal Line 1"
                    onChange={handleChange} />
                  <Input
                    title="Postal Line 2"
                    value={employeeDetails.Post_Line2 || ""}
                    type="address"
                    inputId="Post_Line2"
                    name="Post_Line2"
                    placeholder="Postal Line 2"
                    onChange={handleChange} />
                </div>
                <div className="md:flex w-full gap-10">
                  <Input
                    title="Postal Line 3"
                    value={employeeDetails.Post_Line3 || ""}
                    type="text"
                    inputId="Post_Line3"
                    name="Post_Line3"
                    placeholder="Postal Line 3"
                    onChange={handleChange} />
                  <Input
                    title="Postal Line 4"
                    value={employeeDetails.Post_Line4 || ""}
                    type="text"
                    inputId="Post_Line4"
                    name="Post_Line4"
                    placeholder="Postal Line 4"
                    onChange={handleChange} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ flex: '0 0 48%' }}>
                    <Input
                      title="Postal Line 5"
                      value={"no values for now"}
                      type="text"
                      inputId="Post_Line5"
                      name="Post_Line5"
                      placeholder="Postal Line 5"
                      onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}