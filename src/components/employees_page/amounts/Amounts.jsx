import React, { useState } from 'react'
import { useDataContexts } from '../../../ContextProviders/DataContexts'
import Input from '../../../styled/inputs'
import { CgMore } from 'react-icons/cg'
import { AddAmountPopup } from '../../SearchPopup'



export default function Amounts() {
  const { employee } = useDataContexts()
  const { showError } = useDataContexts()
  const { amounts, setAmounts} = useDataContexts()
  const { parmCodes } = useDataContexts()
  const { inputedAmounts, setInputedAmounts, } = useDataContexts()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputedAmounts((date) => ({
      ...date,
      [name]: value,
    }));
  };

  function updateEmployeesAmt(updatedEmployeeAmt) {
    // Create a copy of the object to avoid mutating the original
    let updatedEmployeeAmtCopy = { ...updatedEmployeeAmt };

    // Remove the RefNoName key and value

    delete updatedEmployeeAmtCopy.CodeName;

    // Append the updated object to the array
    setAmounts(prevAmt => prevAmt.concat(updatedEmployeeAmtCopy));

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateEmployeesAmt(inputedAmounts)
  }

  
  return (
    <>
      <div className="overflow-x-auto  p-4">
      <div className="flex flex-col h-[28rem] overflow-y-auto overflow-x-auto bg-slate-200 p-5 m-8 rounded-lg">
          <table className="table overflow-y-auto overflow-x-auto">
            {/* head */}
            <thead>
              <tr>
                <th>Ordinal Number</th>
                <th>Code Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {amounts.filter(item => item.EmpNo === employee.EmpNo).map((item, index) => {
                const parmItem = parmCodes.find(parm => parm.OrdinalNo === item.OrdinalNo);

                return (
                  <tr className="hover no-select" key={index}>
                    <td>{item.OrdinalNo}</td>
                    <td>{parmItem.CodeName}</td>
                    <td>{item.Amt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>

        <button
          type="submit"
          className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-8"
          onClick={() => document.getElementById('AddAmountModal').showModal()}
        >
          Add dates
        </button>
      </div>

      <dialog id="AddAmountModal" className="modal flex-auto">
        <div className=" bg-slate-200 p-16 rounded-xl">
          <div className="inline-flex">
            <h1 className="text-3xl text-center mb-5 font-bold mr-6">Add Date Details</h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost  mb-5">✕</button>
            </form>
          </div>
          <form onSubmit={(e) => {
            handleSubmit(e);
            document.getElementById('AddAmountModal').close();
          }}>
            <div className="md:flex gap-20 flex-wrap">
              <div className="flex-1">
                <div className="mt-10">
                  <div className="flex flex-col">
                    <div className="md:flex w-full gap-10">
                      <Input
                        title="Select Date Name"
                        value={inputedAmounts.OrdinalNo + " " + inputedAmounts.CodeName}
                        type="text"
                        inputId="OrdinalNo"
                        name="OrdinalNo"
                        // step="0.01"
                        placeholder="Select Code Name"
                        onChange={handleChange}
                        Icon={CgMore}
                        onIconClick={() => document.getElementById('AddCodeModal').showModal()}
                      />
                    </div>

                    <div className="md:flex w-full gap-10">
                    <Input
                        title="Enter Amount"
                        value={inputedAmounts.Amt}
                        type="number"
                        inputId="Amt"
                        name="Amt"
                        // step="0.01"
                        placeholder="$0.000000000"
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

      <AddAmountPopup />

    </>
  )
}
