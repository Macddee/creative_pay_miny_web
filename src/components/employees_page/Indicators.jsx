import React, { useState } from 'react'
import { AddIndValPopup, AddIndicatorsPopup, BankAccHolderPopup } from '../SearchPopup'
import { useDataContexts } from '../../ContextProviders/DataContexts'
import Input from '../../styled/inputs'
import { CgMore, CgSearch } from 'react-icons/cg'
import PopupMsg from '../PopupMsg'
import Loading from '../Loading'
import Error from '../Error'
import { MdDelete, MdModeEditOutline } from 'react-icons/md'



export default function Indicators() {
  const {
    showError, setShowError,
    employee,
    primaryIndicators,
    allIndicators,
    employeesIndicators, setEmployeesIndicators,
    inputedEmployeeIndicator, setInputedEmployeeIndicator,
    token, postUrl,
    isLoading,
    setIsLoading,
    showPopupMsg, setShowPopupMsg,
    popupContent, setPopupContent
  } = useDataContexts()


  const [errorMesage, setErrorMessage] = useState("")
  const [editingFlag, setEditingFlag] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputedEmployeeIndicator((indicator) => ({
      ...indicator,
      [name]: value,
    }));
  };


  function updateEmployeesIndicators(updatedEmployeeInd) {
    setEmployeesIndicators(prevInd => prevInd.concat(updatedEmployeeInd));
  }

  const handleDelete = (index) => {
    setInputedBatches(prevBatches =>
      prevBatches.filter((_, i) => i !== index)
    );
  };

  // const confirmSomething = ((e) => {})
  // const confirmSomething2 = (e) => {}

  const handleSubmit = ((e) => {
    e.preventDefault()

    if (editingFlag) {
      console.log(inputedEmployeeIndicator);

      setEmployeesIndicators(prevInds =>
        prevInds.map(item =>
          item.OrdinalNo === inputedEmployeeIndicator.OrdinalNo && item.EmpNo === inputedEmployeeIndicator.EmpNo
            ? {
              ...item,
              ...inputedEmployeeIndicator
            }
            : item
        )
      );
      prepareNewInd()
      updateEmployee()
      return;
    }

    console.log("are we here.")


    const existingInd = employeesIndicators.find(item => item.OrdinalNo === inputedEmployeeIndicator.OrdinalNo);

    if (existingInd) {
      setErrorMessage("An indicator with this value already exists.");
      setShowError(true);
      prepareNewInd();
    } else {
      updateEmployeesIndicators(inputedEmployeeIndicator);
      updateEmployee();
      prepareNewInd();
    }
  })


  const updateEmployee = () => {
    setIsLoading(true)

    const requestBody = JSON.stringify({
      "cp_indicators_data": [inputedEmployeeIndicator],
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

  const prepareNewInd = () => {
    setInputedEmployeeIndicator(
      {
        EmpNo: "",
        Ind: "",
        OrdinalNo: "",
      })
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
                  <th>Indicator Number</th>
                  <th>Indicator Name</th>
                  <th>Indicator Value</th>
                  {/* <th>Edit</th>
                  <th>Delete</th> */}
                </tr>
              </thead>
              <tbody>
                {employeesIndicators.filter(item => item.EmpNo === employee.EmpNo).map((item, index) => {
                  const indicator = primaryIndicators.find(ind => ind.IndicatorNo === item.OrdinalNo);
                  const indicatorVal = allIndicators.find(allInd => allInd.IndicatorNo === item.OrdinalNo & allInd.IndVal === item.Ind)
                  console.log(item);

                  return (
                    <tr className="hover no-select" key={index}>
                      <td>{item.OrdinalNo}</td>
                      <td>{indicator.IndName}</td>
                      <td>{item.Ind + " - " + indicatorVal.IndValName}</td>
                      <td>
                        <button type='button' onClick={() => {
                          document.getElementById('AddIndicatorModal').showModal()
                          setInputedEmployeeIndicator(item)
                          setEditingFlag(true)
                        }}
                          className=" text-green-600 text-2xl">
                          <MdModeEditOutline />
                        </button>
                      </td>
                      <td>
                        <button type='button' onClick={() => { handleDelete(index = index) }} className=" text-red-500 text-2xl">
                          <MdDelete />
                        </button>
                        
                      </td>
                    </tr>
                  );
                })}
                {/* remote car,
                9v bettery */}
              </tbody>
            </table>

          </div>

          <button
            type="submit"
            className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-8"
            onClick={() => {
              prepareNewInd();
              document.getElementById('AddIndicatorModal').showModal()
            }
            }
          >
            Add Indicator Details
          </button>
        </div>

        <dialog id="AddIndicatorModal" className="modal flex-auto">
          <div className=" bg-slate-200 p-16 rounded-xl">
            <div className="inline-flex">
              <h1 className="text-3xl text-center mb-5 font-bold mr-6">Add Indicator Details</h1>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost  mb-5">✕</button>
              </form>
            </div>
            <form onSubmit={(e) => {
              handleSubmit(e);
              // document.getElementById('AddIndicatorModal').close();
            }}>
              <div className="md:flex gap-20 flex-wrap">
                <div className="flex-1">
                  <div className="mt-10">
                    <div className="flex flex-col">
                      <div className="md:flex w-full gap-10">
                        <Input
                          title="Select Indicator"
                          value={inputedEmployeeIndicator.OrdinalNo}
                          type="text"
                          inputId="IndValName"
                          name="IndValName"
                          // step="0.01"
                          placeholder="Select Indicator"
                          onChange={handleChange}
                          Icon={CgMore}
                          onIconClick={() => document.getElementById('AddIndicatorsModal').showModal()}
                        />
                      </div>

                      <div className="md:flex w-full gap-10">
                        <Input
                          title="Value"
                          value={inputedEmployeeIndicator.Ind}
                          type="text"
                          inputId="IndVal"
                          name="IndVal"
                          placeholder="Input Indicator value"
                          onChange={handleChange}
                          Icon={CgMore}
                          onIconClick={() => document.getElementById('AddIndValModal').showModal()}
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
                Upload Indicator Values
              </button>
            </form>
          </div>
        </dialog>

        {showPopupMsg &&
          <PopupMsg message={popupContent} />
        }
        <AddIndicatorsPopup />
        <AddIndValPopup />

      </>
  )
}
