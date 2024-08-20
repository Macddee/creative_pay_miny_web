import React, { useState } from 'react'
import { AddRefPopup } from '../SearchPopup'
import { useDataContexts } from '../../ContextProviders/DataContexts'
import Input from '../../styled/inputs'
import { CgMore, CgSearch } from 'react-icons/cg'



export default function Reference() {
  const { showError } = useDataContexts()
  const { employee } = useDataContexts()
  const { inputedRef, setInputedRef } = useDataContexts()
  const { references, setReferences } = useDataContexts()
  const { referencesData } = useDataContexts()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputedRef((ref) => ({
      ...ref,
      [name]: value,
    }));
  };

  function updateEmployeesRef(updatedEmployeeRef) {
    // Create a copy of the object to avoid mutating the original
    let updatedEmployeeRefCopy = { ...updatedEmployeeRef };
    // Remove the RefNoName key and value
    delete updatedEmployeeRefCopy.RefNoName;
    // Append the updated object to the array
    setReferences(prevRef => prevRef.concat(updatedEmployeeRefCopy));
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateEmployeesRef(inputedRef)
  }

  return (
    <>
      <div className="overflow-x-auto  p-4">
        <div className="flex flex-col h-[28rem] overflow-y-auto overflow-x-auto bg-slate-200 p-5 m-8 rounded-lg">
          <table className="table overflow-y-auto overflow-x-auto">
            {/* head */}
            <thead>
              <tr>
                <th>Reference Number</th>
                <th>Reference Name</th>
                <th>Reference Code</th>
                <th>Reference Value</th>
              </tr>
            </thead>
            <tbody>
              {references.filter(item => item.EmpNo === employee.EmpNo).map((item, index) => {
                const ref = referencesData.find(ref => ref.OrdinalNo === item.OrdinalNo);

                // const indicatorVal = allIndicators.find(ind => ind.IndicatorNo === item.OrdinalNo);


                return (
                  <tr className="hover no-select" key={index}>
                    <td>{item.OrdinalNo}</td>
                    <td>{ref.RefNoName}</td>
                    <td>{ }</td>
                    <td>{item.RefNo}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>

        <button
          type="submit"
          className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-8"
          onClick={() => document.getElementById('AddReferenesModal').showModal()}
        >
          Add Bank Details
        </button>
      </div>

      <dialog id="AddReferenesModal" className="modal flex-auto">
        <div className=" bg-slate-200 p-16 rounded-xl">
          <div className="inline-flex">
            <h1 className="text-3xl text-center mb-5 font-bold mr-6">Add Indicator Details</h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost  mb-5">✕</button>
            </form>
          </div>
          <form onSubmit={(e) => {
            handleSubmit(e);
            document.getElementById('AddReferenesModal').close();
          }}>
            <div className="md:flex gap-20 flex-wrap">
              <div className="flex-1">
                <div className="mt-10">
                  <div className="flex flex-col">
                    <div className="md:flex w-full gap-10">
                      <Input
                        title="Select Reference"
                        value={inputedRef.OrdinalNo + " " + inputedRef.RefNoName}
                        type="text"
                        inputId="OrdinalNo"
                        name="OrdinalNo"
                        // step="0.01"
                        placeholder="Select Reference"
                        onChange={handleChange}
                        Icon={CgMore}
                        onIconClick={() => document.getElementById('AddRefModal').showModal()}
                      />
                    </div>

                    <div className="md:flex w-full gap-10">
                      <Input
                        title="Value"
                        value={inputedRef.RefNo}
                        type="text"
                        inputId="RefNo"
                        name="RefNo"
                        placeholder="Input Reference value"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Error inoformation popup. */}
            {showError &&
              <div className="pb-6 pt-3">
                <Error message={errorMesage} />
              </div>
            }

            <button
              type="submit"
              className=" w-full mx-auto btn bg-blue-400 hover:bg-blue-200 outline-blue-600 text-black border-blue-600"
            >
              Save
            </button>
          </form>
        </div>
      </dialog>

      <AddRefPopup />

    </>
  )
}
