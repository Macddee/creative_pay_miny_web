import React, { useState, useEffect } from "react";
import Input from "../../../styled/inputs"
import { CgMore } from "react-icons/cg";
import { CompanyCostCodePopup, OccupationCodePopup, PayPointPopup } from "../../SearchPopup";
import { useDataContexts } from "../../../ContextProviders/DataContexts";
import { convertFromDateTimeToJulian, convertFromJulianToDateTime } from "../../logic/EmployeeLogic";

export default function Empcompany() {
  const { 
    setAllEmployees,
    employee, setEmployee } = useDataContexts()


    const handleChange = (e) => {
      const { name, value } = e.target;
      let newVal = value;
  
      if (name.includes("Date")) {
        newVal = convertFromDateTimeToJulian(value);
        console.log(newVal);
      }
  
      setEmployee((employee) => ({
        ...employee,
        [name]: newVal,
      }));
    };

  function updateEmployeeDetails(updatedEmployee) {
    setAllEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee.EmpNo === updatedEmployee.EmpNo ? updatedEmployee : employee
      )
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateEmployeeDetails(employee)
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
                    title="Cost Code"
                    value={employee.CostCodes}
                    type="text"
                    inputId="CostCodes"
                    name="CostCodes"
                    placeholder="Cost Code"
                    Icon={CgMore}
                    onIconClick={() => document.getElementById('CompanyCodeModal').showModal()}
                    onChange={handleChange} />
                  <Input
                    title="Pay Point"
                    value={employee.PayPoint}
                    type="text"
                    inputId="PayPoint"
                    name="PayPoint"
                    placeholder="Pay Point"
                    onChange={handleChange}
                    Icon={CgMore}
                    onIconClick={() => document.getElementById('PayPointModal').showModal()} />
                </div>
                <div className="md:flex w-full gap-10">
                  <Input
                    title="Leave Code"
                    value={employee.LeaveCode}
                    type="text"
                    inputId="LeaveCode"
                    name="LeaveCode"
                    placeholder="Leave Code"
                    onChange={handleChange} />
                  <Input
                    title="Position"
                    value={employee.PositionCode}
                    type="text"
                    inputId="PositionCode"
                    name="PositionCode"
                    placeholder="Position Code"
                    onChange={handleChange} />
                </div>
                <div className="md:flex w-full gap-10">
                  <Input
                    title="Engagement Date"
                    value={convertFromJulianToDateTime(employee.EngageDate)}
                    type="date"
                    inputId="EngageDate"
                    name="EngageDate"
                    placeholder="Engage Date"
                    onChange={handleChange} />
                  <Input
                    title="Occupation"
                    value={employee.Occup}
                    type="text"
                    inputId="Occup"
                    name="Occup"
                    placeholder="Occupation"
                    Icon={CgMore}
                    onIconClick={() => document.getElementById('OccupationCodeModal').showModal()}
                    onChange={handleChange} />
                </div>

                <div className="md:flex w-full gap-10">
                  <Input
                    title="Terminatation date"
                    value={convertFromJulianToDateTime(employee.DischDate)}
                    type="date"
                    inputId="DischDate"
                    name="DischDate"
                    placeholder="XX/XX/20XX"
                    onChange={handleChange} />
                  <Input
                    title="Department"
                    value={employee.StrDeptCode}
                    type="text"
                    inputId="comDept"
                    name="comDept"
                    placeholder="Department"
                    onChange={handleChange} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ flex: '0 0 48%' }}>
                    <Input
                      title="Initials"
                      value={employee.Inits}
                      type="text"
                      inputId="Inits"
                      name="Inits"
                      placeholder="initials"
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
      <CompanyCostCodePopup />
      <PayPointPopup />
      <OccupationCodePopup />
    </>
  );
}