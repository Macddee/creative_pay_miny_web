import React, { useState, useEffect } from "react";
import Input from "../../styled/inputs";
import { useDataContexts } from "../../ContextProviders/DataContexts";

export default function Taxinfo() {
  const { setAllEmployees } = useDataContexts()
  const { employee, setEmployee } = useDataContexts()


  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee((employee) => ({
      ...employee,
      [name]: value,
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
                    title="Tax Code"
                    value={employee.TaxCode}
                    type="text"
                    inputId="TaxCode"
                    name="TaxCode"
                    placeholder="Tax Code"
                    onChange={handleChange} />
                  <Input
                    title="Directive NUmber"
                    value={"employee.DirectiveNumberNotFound"}
                    type="text"
                    inputId="taxDN"
                    name="taxDN"
                    placeholder="Directive Number"
                    onChange={handleChange} />
                </div>
                <div className="md:flex w-full gap-10">
                  <Input
                    title="Tax Dependance"
                    value={"employee.taxDependanceNotFound"}
                    type="text"
                    inputId="taxDependance"
                    name="taxDependance"
                    placeholder="Tax Dependances"
                    onChange={handleChange} />
                  <Input
                    title="Amount"
                    value={employee.DirAmt}
                    type="currency"
                    inputId="DirAmt"
                    name="DirAmt"
                    placeholder="$0.00"
                    onChange={handleChange} />
                </div>
                <div className="md:flex w-full gap-10">
                  <Input
                    title="Percentage"
                    value={employee.DirPercent}
                    type="Number"
                    inputId="DirPercent"
                    name="DirPercent"
                    placeholder="0.0000000000"
                    onChange={handleChange} />
                  <Input
                    title="Tax Office"
                    value={employee.TaxOffice}
                    type="text"
                    inputId="TaxOffice"
                    name="TaxOffice"
                    placeholder="Tax Office"
                    onChange={handleChange} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ flex: '0 0 48%' }}>
                    <Input
                      title="References"
                      value={employee.TaxRef}
                      type="text"
                      inputId="TaxRef"
                      name="TaxRef"
                      placeholder="References"
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
      </div></>
  );
}