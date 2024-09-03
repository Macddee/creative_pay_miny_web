import React, { useEffect, useState } from 'react'
import { useDataContexts } from '../../ContextProviders/DataContexts'
import Input from '../../styled/inputs'
import { CgMore } from 'react-icons/cg'
import { AddAmountPopup, MasterfileEmployeePopup, } from '../SearchPopup'
import Loading from '../Loading'
import PopupMsg from '../PopupMsg'
import Error from '../Error'



export default function Amounts() {
  const {
    employee,
    showError, setShowError,
    amounts, setAmounts,
    parmCodes,
    inputedAmounts, setInputedAmounts,
    token, postUrl,
    isLoading,
    setIsLoading,
    showPopupMsg, setShowPopupMsg,
    popupContent, setPopupContent,
  } = useDataContexts();

  const [replacing, setReplacing] = useState(false);
  const [prevAmt, setPrevAmt] = useState(0);
  const [errorMesage, setErrorMessage] = useState("");
  const existingAmt = amounts.find(item => item.OrdinalNo === inputedAmounts.OrdinalNo && item.EmpNo === inputedAmounts.EmpNo);
  const [masterFileBatch, setMasterFileBatch] = useState([]);
  // const amtInBatch = masterFileBatch.find(item => item.OrdinalNo === inputedAmounts.OrdinalNo && item.EmpNo === inputedAmounts.EmpNo);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputedAmounts((amt) => ({
      ...amt,
      [name]: value,
    }));
  };

  const handleReplace = (k) => {
    setReplacing(k.target.checked)
    if (!replacing) {   //this is actually replacing. donno why js is making my variables objs.
      if (existingAmt) setPrevAmt(existingAmt.Amt);
      // if (amtInBatch) setPrevAmt(existingAmt.Amt);
      const newAmt = Number(prevAmt) + Number(inputedAmounts.Amt)
      setInputedAmounts(prevState => ({ ...prevState, Amt: newAmt }))
    }

    useEffect(() => {
      console.log(inputedAmounts);
      
    }, [inputedAmounts])
  }

  function prepareNewAmt() {
    setInputedAmounts({
      EmpNo: "", OrdinalNo: "", Amt: "", CodeName: "", EmpNames: "", Limit: null,
    })
    setReplacing(false);
    console.log(replacing);

  }

  function updateEmployeesAmt(updatedEmployeeAmt) {
    // Create a copy of the object to avoid mutating the original
    let temp = { ...updatedEmployeeAmt };
    // Remove the RefNoName key and value
    delete temp.CodeName;
    delete temp.Limit;
    delete temp.EmpNames;
    console.log(temp);

    setMasterFileBatch(prevAmt => {
      const index = prevAmt.findIndex(item => item.ordinal === temp.ordinal);
      if (index !== -1) {
        // Replace existing item
        const updatedAmt = [...prevAmt];
        updatedAmt[index] = temp;
        return updatedAmt;
      } else {
        // Append new item
        return prevAmt.concat(temp);
      }
    });
    
    setAmounts(prevAmt => {
      const index = prevAmt.findIndex(item => item.ordinal === temp.ordinal);
      if (index !== -1) {
        // Replace existing item
        const updatedAmt = [...prevAmt];
        updatedAmt[index] = temp;
        return updatedAmt;
      } else {
        // Append new item
        return prevAmt.concat(temp);
      }
    });
  }
  

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(amtInBatch);

    if (inputedAmounts.Amt > inputedAmounts.Limit) {
      setErrorMessage(`Amount should not be greater than the code limit of ${inputedAmounts.Limit}.`);
      setShowError(true);
      return
    }

    if (existingAmt) {
      if (!replacing) {
        setErrorMessage("An amount of this type already exists; Try replacing.");
        setShowError(true);
      } else {
        updateEmployeesAmt(inputedAmounts)
        prepareNewAmt()
      }

    } else {
      updateEmployeesAmt(inputedAmounts)
      prepareNewAmt()
    }

  }

  const handleUpload = () => {
    updateEmployee(masterFileBatch)

  }


  const updateEmployee = (cpamt) => {
    setIsLoading(true)

    const requestBody = JSON.stringify({
      "cp_amounts": cpamt,
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
        <div className="overflow-x-auto m-0 p-0">
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
                {masterFileBatch
                  .sort((a, b) => Number(a.OrdinalNo) - Number(b.OrdinalNo)) // Convert OrdinalNo to number
                  .map((item, index) => {
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
            Add Amount
          </button>

          <button
            type="submit"
            className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-8"
            onClick={() => {
              handleTransactionBatch(inputedBatches);
            }}
          >
            Submit Masterfile Batches
          </button>
        </div>

        <dialog id="AddAmountModal" className="modal flex-auto">
          <div className=" bg-slate-200 p-16 rounded-xl">
            <div className="inline-flex">
              <h1 className="text-3xl text-center mb-5 font-bold mr-6">Add Amounts Details</h1>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost  mb-5">✕</button>
              </form>
            </div>
            <form onSubmit={(e) => {
              handleSubmit(e);
            }}>
              <div className="md:flex gap-20 flex-wrap">
                <div className="flex-1">
                  <div className="mt-10">
                    <div className="flex flex-col">
                      <div className="md:flex w-full gap-10">
                        <Input
                          title={"Employee Name: " + inputedAmounts.EmpNames}
                          value={inputedAmounts.EmpNo || ""}
                          type="text"
                          inputId="EmpNo"
                          name="EmpNo"
                          // step="0.01"
                          placeholder="Select Employee"
                          onChange={handleChange}
                          Icon={CgMore}
                          onIconClick={() => document.getElementById('masterfileEmpModal').showModal()}
                        />
                      </div>
                      <div className="md:flex w-full gap-10">
                        <Input
                          title={"Amount Name: " + inputedAmounts.OrdinalNo + " " + inputedAmounts.CodeName}
                          value={inputedAmounts.OrdinalNo || ""}
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
                          title={!replacing ? "Enter Amount" : (
                            <>
                              Old amount: {prevAmt} <br />
                              New Amount: {inputedAmounts.Amt} <br />
                              Final Amount: {Number(prevAmt) + Number(inputedAmounts.Amt)}
                            </>
                          )}
                          value={inputedAmounts.Amt}
                          type="number"
                          inputId="Amt"
                          name="Amt"
                          // step="0.01"
                          placeholder="$0.000000000"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-control mx-auto py-3">
                        <label className="label cursor-pointer">
                          <input
                            type="checkbox"
                            name="toReplace"
                            checked={replacing}
                            onChange={(k) => handleReplace(k)}
                            className="checkbox checkbox-primary mr-4"
                          />
                          <span className="label-text gap-">Replace</span>
                        </label>
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
              // onClick={() => handleSave()}
              >
                Save
              </button>
            </form>
          </div>
        </dialog>

        {showPopupMsg &&
          <PopupMsg message={popupContent} />
        }
        <AddAmountPopup />
        <MasterfileEmployeePopup />

      </>
  )
}
