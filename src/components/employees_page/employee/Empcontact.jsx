import React, { useState, useEffect } from "react";
import { useDataContexts } from "../../../ContextProviders/DataContexts";
import Input from "../../../styled/inputs"

export default function Empaddress() {
  const  {employeeDetails, setemployeeDetails} = useDataContexts()  
  const  {setAllEmployeeDetails} = useDataContexts()  
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    setemployeeDetails((employee) => ({
      ...employee,
      [name]: value,
    }));
  };
    
  console.log(employeeDetails);

  function updateEmployeeDetails(updatedEmployeeDetails) {
    setAllEmployeeDetails(prevEmployees =>
      prevEmployees.map(employee =>
        employeeDetails.EmpNo === updatedEmployeeDetails.EmpNo ? updatedEmployeeDetails : employee
      )
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateEmployeeDetails(employeeDetails)
  }

  return (
    <div>
      <div className="bg-blue-100 max-w-[1300px] p-5 md:p-15 py-10 rounded-lg w-[95%] relative block mt-1 m-auto">
        {/* <h1 className="text-3xl text-center font-bold">Update Employeee Details</h1> */}
        <form onSubmit={handleSubmit} >
          <div className="md:flex gap-20 flex-wrap">
            <div className="flex-1">
              <div className="flex flex-col">
                <div className="md:flex w-full gap-10">
                  <Input
                    title="Home Number"
                    value={employeeDetails.PhoneHome}
                    type="text"
                    inputId="PhoneHome"
                    name="PhoneHome"
                    placeholder="Home Number"
                    onChange={handleChange} />
                  <Input
                    title="Mobile Number"
                    value={employeeDetails.PhoneCell}
                    type="number"
                    inputId="PhoneCell"
                    name="PhoneCell"
                    placeholder="Mobile Number"
                    onChange={handleChange} />
                </div>

                <div className="md:flex w-full gap-10">
                  <Input
                    title="Business Number"
                    value={employeeDetails.PhoneBusiness}
                    type="number"
                    inputId="PhoneBusiness"
                    name="PhoneBusiness"
                    placeholder="Business Number"
                    onChange={handleChange} />
                  <Input
                    title="Email Address"
                    value={employeeDetails.EmailAddress}
                    type="email"
                    inputId="EmailAddress"
                    name="EmailAddress"
                    placeholder="Email Address"
                    onChange={handleChange} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ flex: '0 0 48%' }}>
                    <Input
                      title="Fax Number"
                      value={employeeDetails.PhoneFax}
                      type="number"
                      inputId="PhoneFax"
                      name="PhoneFax"
                      placeholder="Phone Fax"
                      onChange={handleChange} />
                  </div>
                </div>

              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-1"
            onClick={() => console.log("pressed")}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
