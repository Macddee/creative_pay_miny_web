import React, { useState } from 'react'
import { AddDatePopup, AddRefPopup } from '../SearchPopup'
import { useDataContexts } from '../../ContextProviders/DataContexts'
import Input from '../../styled/inputs'
import { CgMore, CgSearch } from 'react-icons/cg'
import DatePicker from 'react-datepicker'
import Loading from '../Loading'
import PopupMsg from '../PopupMsg'



export default function Dates() {
  const {
    showError,
    employee,
    inputedDate, setInputedDate,
    dates, setDates,
    datesData,
    token, postUrl,
    isLoading,
    setIsLoading,
    showPopupMsg, setShowPopupMsg,
    popupContent, setPopupContent,
  } = useDataContexts();
  //   dates, setDates
  // datesData, setDatesData
  // inputedDate, setInputedDate

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputedDate((date) => ({
      ...date,
      [name]: value,
    }));
  };

  function updateEmployeesDate(updatedEmployeeDate) {
    // Create a copy of the object to avoid mutating the original
    let updatedEmployeeDateCopy = { ...updatedEmployeeDate };

    // Remove the RefNoName key and value

    delete updatedEmployeeDateCopy.DateName;

    // Append the updated object to the array
    setDates(prevDate => prevDate.concat(updatedEmployeeDateCopy));

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateEmployee()
    updateEmployeesDate(inputedDate)
  }

  const updateEmployee = () => {
    setIsLoading(true)

    const requestBody = JSON.stringify({
      "cp_dates_data": [inputedDate],
    });

    console.log(requestBody); 

    fetch(postUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },

      body: requestBody
    })
      .then(response => response.json())
      .then(data => {
        setShowPopupMsg(true),
          setPopupContent(data.message)
          console.log(data.message)
        setIsLoading(false)
      })
      .catch(error => {
        setShowPopupMsg(true),
          setPopupContent(error.message)
          console.log(error.message)
        setIsLoading(false)
      });
  }


  return (
    isLoading
      ? <Loading />
      : <>
      <div className="overflow-x-auto  p-4">
      <div className="flex flex-col h-[28rem] overflow-y-auto overflow-x-auto bg-slate-200 p-5 m-8 rounded-lg">
          <table className="table overflow-y-auto overflow-x-auto">
            {/* head */}
            <thead>
              <tr>
                <th>Date Number</th>
                <th>Date Name</th>
                <th>Date Value</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dates.filter(item => item.EmpNo === employee.EmpNo).map((item, index) => {
                const currentDate = datesData.find(ref => ref.OrdinalNo === item.OrdinalNo);
                // const key = `${item.EmpNo}-${item.OrdinalNo}-${index}`
                // console.log(key);

                // const indicatorVal = allIndicators.find(ind => ind.IndicatorNo === item.OrdinalNo);


                return (
                  <tr className="hover no-select" key={index}>
                    <td>{item.OrdinalNo}</td>
                    <td>{currentDate.DateName}</td>
                    <td>{item.DateValue}</td>
                    <td>{"date icon"}</td>

                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>

        <button
          type="submit"
          className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-8"
          onClick={() => document.getElementById('AddDateModal').showModal()}
        >
          Add dates
        </button>
      </div>

      <dialog id="AddDateModal" className="modal flex-auto">
        <div className=" bg-slate-200 p-16 rounded-xl">
          <div className="inline-flex">
            <h1 className="text-3xl text-center mb-5 font-bold mr-6">Add Date Details</h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost  mb-5">✕</button>
            </form>
          </div>
          <form onSubmit={(e) => {
            handleSubmit(e);
            document.getElementById('AddDateModal').close();
          }}>
            <div className="md:flex gap-20 flex-wrap">
              <div className="flex-1">
                <div className="mt-10">
                  <div className="flex flex-col">
                    <div className="md:flex w-full gap-10">
                      <Input
                        title={"Select Date Name: " + inputedDate.OrdinalNo + " " + inputedDate.DateName}
                        value={inputedDate.OrdinalNo||""}
                        type="text"
                        inputId="OrdinalNo"
                        name="OrdinalNo"
                        // step="0.01"
                        placeholder="Select Reference"
                        onChange={handleChange}
                        Icon={CgMore}
                        onIconClick={() => document.getElementById('AddDateNameModal').showModal()}
                      />
                    </div>

                    <div className="md:flex w-full gap-10">
                    <Input
                        title="Select Date Name"
                        value={inputedDate.DateValue}
                        type="date"
                        inputId="DateValue"
                        name="DateValue"
                        // step="0.01"
                        placeholder="Select Reference"
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

      {showPopupMsg &&
          <PopupMsg message={popupContent} />
        }
      <AddDatePopup />

    </>
  )
}
