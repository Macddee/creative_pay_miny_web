import React, { useEffect, useState } from 'react'
import { useDataContexts } from '../../ContextProviders/DataContexts'
import Input from '../../styled/inputs'
import { CgMore } from 'react-icons/cg'
import { AddAmountPopup, MasterfileEmployeePopup, } from '../SearchPopup'
import Loading from '../Loading'
import PopupMsg from '../PopupMsg'
import Error from '../Error'
import { MdDelete, MdModeEditOutline } from 'react-icons/md'



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

  const [editingFlag, setEditingFlag] = useState(false);
  const [errorMesage, setErrorMessage] = useState("");
  const [masterFileBatch, setMasterFileBatch] = useState([]);
  // const amtInBatch = masterFileBatch.find(item => item.OrdinalNo === inputedAmounts.OrdinalNo && item.EmpNo === inputedAmounts.EmpNo);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputedAmounts((amt) => ({
      ...amt,
      [name]: value,
    }));
  };


  function prepareNewAmt() {
    setInputedAmounts({
      EmpNo: "", OrdinalNo: "", Amt: "", CodeName: "", EmpNames: "", Limit: null, replacing: false
    })
  }


  function correctAmt(updatedEmployeeAmt) {
    // Create a copy of the object to avoid mutating the original
    let temp = { ...updatedEmployeeAmt };
    // Remove the RefNoName key and value
    delete temp.CodeName;
    delete temp.Limit;
    delete temp.EmpNames;

    return temp;
  }

  const handleDelete = (index) => {
    setMasterFileBatch(prevBatches => 
      prevBatches.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    let existingAmt = amounts.find(item => item.OrdinalNo === inputedAmounts.OrdinalNo && item.EmpNo === inputedAmounts.EmpNo);
    const fixedAmt = correctAmt(inputedAmounts);
    const index = masterFileBatch.findIndex(item => item.OrdinalNo === fixedAmt.OrdinalNo && item.EmpNo === fixedAmt.EmpNo);

    if (editingFlag) {
      setMasterFileBatch(prevBatches =>
        prevBatches.map(item =>
          item.EmpNo === fixedAmt.EmpNo  && item.OrdinalNo === fixedAmt.OrdinalNo
            ? { ...item, ...fixedAmt } // Replace the item with fixedAmt
            : item
        )
      );
      prepareNewAmt();
      return;
    }

    if (inputedAmounts.Amt > inputedAmounts.Limit) {
      setErrorMessage(`Amount should not be greater than the code limit of ${inputedAmounts.Limit}.`);
      setShowError(true);
      return
    }

    // since we have 2 variables the original amounts and the new batch, we want to find if an item is in both amounts and batch
    //  and if thats true, we put the one in batch to existing item so that we we use the most updated one.

    if (index !== -1) {
      existingAmt = { ...masterFileBatch[index] }
    }

    if (existingAmt) {
      if (inputedAmounts.replacing) {
        setMasterFileBatch(prevBatches => [
          ...prevBatches.slice(0, index), // Items before the updated item
          fixedAmt,                       // The updated item
          ...prevBatches.slice(index + 1) // Items after the updated item
        ]);
        prepareNewAmt()

      } else {

        const incrementedAmt = { ...fixedAmt, Amt: Number(existingAmt.Amt) + Number(fixedAmt.Amt) }

        setMasterFileBatch(prevBatches => [
          ...prevBatches.slice(0, index), // Items before the updated item
          incrementedAmt,                       // The updated item
          ...prevBatches.slice(index + 1) // Items after the updated item
        ]);
      }
      prepareNewAmt()
    } else {
      setMasterFileBatch(allBetches => allBetches.concat(fixedAmt))
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
                  <th>Employee Number</th>
                  <th>Amount</th>
                  <th>Replace</th>
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
                        <td>{item.EmpNo}</td>
                        <td>{item.Amt}</td>
                        <td>{item.replacing ? "True" : "False"}</td>
                        <td>
                          <button type='button' onClick={() => {
                            document.getElementById('AddAmountModal').showModal()
                            setInputedAmounts(item)
                            setEditingFlag(true)
                          }}
                            className=" text-green-600 text-2xl">
                            <MdModeEditOutline />
                          </button>
                        </td>

                        <td>
                          <button type='button' onClick={() => { handleDelete(index=index) }} className=" text-red-500 text-2xl">
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
                          title="Enter Amount"
                          // title={!replacing ? "Enter Amount" : (
                          //   <>
                          //     Old amount: {prevAmt} <br />
                          //     New Amount: {inputedAmounts.Amt} <br />
                          //     Final Amount: {Number(prevAmt) + Number(inputedAmounts.Amt)}
                          //   </>
                          // )}
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
                            checked={inputedAmounts.replacing}
                            onChange={e => setInputedAmounts({ ...inputedAmounts, replacing: e.target.checked })}
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
