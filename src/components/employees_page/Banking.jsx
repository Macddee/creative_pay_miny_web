import React, { useState } from 'react'
import { BankAccHolderPopup, BankPayModePopup, BankSortCodePopup } from '../SearchPopup'
import { useDataContexts } from '../../ContextProviders/DataContexts'
import Input from '../../styled/inputs'
import { CgMore, CgSearch } from 'react-icons/cg'
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";



export default function Banking() {
  const { 
    showError, 
    employeesBankDetails, setEmployeesBankDetails,
    employee,
    allBanksData,
    inputedBankData, setInputedBankData,
    payMode, accHolder } = useDataContexts()

    console.log(accHolder, payMode)


  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputedBankData((bankDetail) => ({
      ...bankDetail,
      [name]: value,
    }));
  };


  function updateEmployeesBankDetails(updatedEmployeeDetail) {
    setEmployeesBankDetails(prevDetails => prevDetails.concat(updatedEmployeeDetail));
  }

  function updateEditsOnEmployeesBankDetails(updatedEmployeeDetail) {
    setEmployeesBankDetails(prevDetails => prevDetails.concat(updatedEmployeeDetail));
  }

  const handleSubmit = (e, shouldUpdateEdits = false) => {
    e.preventDefault();
    if (shouldUpdateEdits) {
      updateEditsOnEmployeesBankDetails(inputedBankData);
    } else {
      updateEmployeesBankDetails(inputedBankData);
    }
  };
  return (
    <>
      <div className="overflow-x-auto  p-4">
      <div className="flex flex-col h-[28rem] overflow-y-auto overflow-x-auto bg-slate-200 p-5 m-8 rounded-lg">
          <table className="table overflow-y-auto overflow-x-auto">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Sort Code</th>
                <th>Bank Name</th>
                <th>Axcount name</th>
                <th>Account#</th>
                <th>Account type</th>
                <th>Pay Mode</th>
                <th>Split Code</th>
                <th>Account Holder</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {employeesBankDetails.filter(item => item.EmpNo === employee.EmpNo).map((item, index) => {
                const bank = allBanksData.find(bankitem => bankitem.BankSortCode === item.DestinBankSortCode);
                const type = accHolder.find(holder => holder.OrdinalNo === item.AccountHolderStatus);
                const paymode = payMode.find(mode => mode.symbol === item.PayMode);
                console.log(bank);
                console.log(type);
                console.log(payMode);
                
                return (
                  <tr className="hover no-select" key={index} onClick={() => {
                  }}>
                    <td>{index + 1}</td>
                    <td>{item.DestinBankSortCode}</td>
                    <td>{bank.BranchName}</td>
                    <td>{item.DestinBankAccountName}</td>
                    <td>{item.DestinBankAccountNumber}</td>
                    <td>{type? type.holder :"not available"}</td>
                    <td>{paymode? paymode.mode : "not available"}</td>
                    <td>{item.SplitPayCode}</td>
                    <td>{item.AccountHolderStatus}</td>
                    <td>
                      <button type='button' onClick={() => {
                        document.getElementById('AddBankDetailModal').showModal()
                        setInputedBankData(item)
                      }}
                        className=" text-green-600 text-2xl">
                        <MdModeEditOutline />
                      </button>
                    </td>

                    <td>
                      <button type='button' onClick={() => { }} className=" text-red-500 text-2xl">
                        <MdDelete />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>

        <button
          type="submit"
          className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-8"
          onClick={() => document.getElementById('AddBankDetailModal').showModal()}
        >
          Add Bank Details
        </button>
      </div>

      <dialog id="AddBankDetailModal" className="modal flex-auto">
        <div className=" bg-slate-200 p-16 rounded-xl">
          <div className="inline-flex">
            <h1 className="text-3xl text-center mb-5 font-bold mr-6">Add Bank Details</h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost  mb-5">✕</button>
            </form>
          </div>
          <form onSubmit={(e) => {
            handleSubmit(e);
            document.getElementById('AddBankDetailModal').close();
          }}>
            <div className="md:flex gap-20 flex-wrap">
              <div className="flex-1">
                <div className="mt-10">
                  <div className="flex flex-col">
                    <div className="md:flex w-full gap-10">
                      <Input
                        title="Account name"
                        value={inputedBankData.DestinBankAccountName}
                        type="text"
                        inputId="DestinBankAccountName"
                        name="DestinBankAccountName"
                        placeholder="Account number"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:flex w-full gap-10">
                      <Input
                        title="Account Number"
                        value={inputedBankData.DestinBankAccountNumber}
                        type="number"
                        inputId="DestinBankAccountNumber"
                        name="DestinBankAccountNumber"
                        placeholder="Account Number"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="md:flex w-full gap-10">
                      <Input
                        title="Sort Code"
                        value={inputedBankData.DestinBankSortCode + " " + inputedBankData.BranchName}
                        type="text"
                        inputId="DestinBankSortCode"
                        name="DestinBankSortCode"
                        // step="0.01"
                        placeholder="Select Sort Code"
                        onChange={handleChange}
                        Icon={CgMore}
                        onIconClick={() => document.getElementById('BankSortCodeModal').showModal()}
                      />
                    </div>
                    <div className="md:flex w-full gap-10">
                      <Input
                        title="Pay Mode"
                        value={inputedBankData.PayMode + " " + inputedBankData.Mode}
                        type="text"
                        inputId="PayMode"
                        name="PayMode"
                        placeholder="Select Pay Mode"
                        onChange={handleChange}
                        Icon={CgMore}
                        onIconClick={() => document.getElementById('BankPayModeModal').showModal()} />
                    </div>

                    <div className="md:flex w-full gap-10">
                      <Input
                        title="Account Holder Status"
                        value={inputedBankData.AccountHolderStatus + " " + inputedBankData.Holder}
                        type="text"
                        inputId="AccountHolderStatus"
                        name="AccountHolderStatus"
                        placeholder="Select Account Holeder Status"
                        onChange={handleChange}
                        Icon={CgMore}
                        onIconClick={() => document.getElementById('BankAccHolderModal').showModal()} />
                    </div>

                    <div className="md:flex w-full gap-10">
                      <Input
                        title="Split Code"
                        value={inputedBankData.SplitPayCode}
                        type="text"
                        inputId="SplitPayCode"
                        name="SplitPayCode"
                        placeholder="Split Code"
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

      <BankSortCodePopup />
      <BankPayModePopup />
      <BankAccHolderPopup />

    </>
  )
}
