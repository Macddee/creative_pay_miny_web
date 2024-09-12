import { useState } from "react";
import Input from "../../styled/inputs";
import { CgMore, CgSearch } from "react-icons/cg";
import Error from "../Error";
import { TransactionCostCodePopup, TransactionEmployeePopup, TransactionParmCodesPopup } from "../SearchPopup";
import { useDataContexts } from "../../ContextProviders/DataContexts";
import Loading from "../Loading";
import PopupMsg from "../PopupMsg";
import { MdDelete, MdModeEditOutline } from "react-icons/md";

export default function Transactions() {

  const [errorMesage, setErrorMessage] = useState("")
  const [inputedBatches, setInputedBatches] = useState([])
  const [editingFlag, setEditingFlag] = useState(false)
  

  const {
    showError, setShowError,
    inputedTransactions, setInputedTransactions,
    token, postUrl,
    isLoading,
    setIsLoading,
    showPopupMsg, setShowPopupMsg,
    popupContent, setPopupContent,
  } = useDataContexts();

  function prepareTransaction() {
    setInputedTransactions({
      EmpNo: "",
      OrdinalNo: "",
      Amt: "",
      toReplace: "",
      batchNo: "",
      costCodes: "",
      time: "",
      Limit: "",
      BreakDesc: "",
      CodeName: "",
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputedTransactions((currentTrans) => ({
      ...currentTrans,
      [name]: value,
    }));
  };

  const handleDelete = (index) => {
    setInputedBatches(prevBatches => 
      prevBatches.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = ((e) => {
    e.preventDefault();

    if(editingFlag){
      setInputedBatches(prevBatches =>
        prevBatches.map(item =>
          item.EmpNo === inputedTransactions.EmpNo && item.CodeName === inputedTransactions.CodeName
            ? {
              ...item,
              ...inputedTransactions
            }
            : item
        )
      );
      prepareTransaction()
      return
    }

    // updateEmployee(employee)
    const existingItem = inputedBatches.find(item => item.EmpNo === inputedTransactions.EmpNo && item.CodeName === inputedTransactions.CodeName);

    if (inputedTransactions.Amt > inputedTransactions.Limit) {
      setErrorMessage(`Amount should not be greater than the code limit of ${inputedTransactions.Limit}`)
      setShowError(() => (true))
      return
    }

    if (existingItem) {
      if (inputedTransactions.toReplace) {
        setInputedBatches(prevBatches =>
          prevBatches.map(item =>
            item.EmpNo === inputedTransactions.EmpNo && item.CodeName === inputedTransactions.CodeName
              ? {
                ...item,
                ...inputedTransactions,
              }
              : item
          )
        );
        prepareTransaction()
      } else {
        setInputedBatches(prevBatches =>
          prevBatches.map(item =>
            item.EmpNo === inputedTransactions.EmpNo && item.CodeName === inputedTransactions.CodeName
              ? {
                ...item,
                Amt: parseFloat(item.Amt) + parseFloat(inputedTransactions.Amt),
                toReplace: inputedTransactions.toReplace
              }
              : item
          )
        );
        prepareTransaction()
      }
    } else {
      setInputedBatches(prevBatches => [...prevBatches, inputedTransactions]);
      prepareTransaction();
    }
  }
  )

  function handleTransactionBatch(savedBatch) {
    // Create a new array with the desired modifications
    let modifiedBatch = savedBatch.map(item => {
      // Create a copy of the object to avoid mutating the original
      let itemCopy = { ...item };
      // update time field
      // Set the date field to the current date
      let currentDate = new Date();
      itemCopy.batchNo = currentDate.toLocaleDateString('en-US');
      itemCopy.time = currentDate.toLocaleTimeString('en-US', { hour12: false });
      // Remove the RefNoName key and value
      delete itemCopy.CodeName;
      delete itemCopy.BreakDesc;
      delete itemCopy.Limit;
      // Return the modified objec

      // Append the updated array to the savedTransaction
      //aslo send send the fixed employees here since setting it in state is being problematic.
      return itemCopy
    });

    updateEmployee(modifiedBatch)

  }

  const updateEmployee = (processedTrans) => {
    setIsLoading(true)

    const requestBody = JSON.stringify({
      "cp_batch_inputs": processedTrans,
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
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee Number</th>
                  <th>Code Number</th>
                  <th>Amount</th>
                  <th>Replace</th>
                </tr>
              </thead>
              <tbody>
                {inputedBatches.map((item, index) => (
                  <tr className="hover no-select " key={index}>
                    <td>{index + 1}</td>
                    <td>{item.EmpNo}</td>
                    <th>{item.CodeName}</th>
                    <td>{item.Amt}</td>
                    <td>{item.dgCostCode}</td>
                    <td>{item.toReplace ? "True" : "False"}</td>
                    <td>
                      <button type='button' onClick={() => {
                        document.getElementById('transactionModal').showModal()
                        setInputedTransactions(item)
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
                ))
                }
              </tbody>
            </table>
          </div>

          <button
            type="submit"
            className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-8"
            onClick={() => {
              document.getElementById('transactionModal').showModal()
            }}
          >
            Add Amount
          </button>


          <button
            type="submit"
            className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-8"
            onClick={() => {
              handleTransactionBatch(inputedBatches);
              // updateEmployee();
            }}
          >
            Submit Transaction Batches
          </button>
        </div>

        {/* the dialogue thats only called after pressing add amount */}
        <dialog id="transactionModal" className="modal flex-auto">
          <div className=" bg-slate-200 p-16 rounded-xl">
            <div className="inline-flex">
              <h1 className="text-3xl text-center mb-5 font-bold mr-6">Transaction Batch Maintance</h1>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost  mb-5">✕</button>
              </form>
            </div>

            <form onSubmit={(e) => {
              handleSubmit(e);
              // document.getElementById('transactionModal').close();
            }}>
              <div className="md:flex gap-20 flex-wrap">
                <div className="flex-1">
                  <div className="mt-10">
                    <div className="flex flex-col">
                      <div className="md:flex w-full gap-10">
                        <Input
                          title={"Employee Number: " + inputedTransactions.EmpNo}
                          value={inputedTransactions.EmpNo || ""}
                          type="number"
                          inputId="EmpNo"
                          name="EmpNo"
                          placeholder="Employee number"
                          onChange={handleChange}
                          Icon={CgSearch}
                          onIconClick={() => document.getElementById('transactionEmpModal').showModal()} />

                      </div>
                      <div className="md:flex w-full gap-10">
                        <Input
                          title={"Enter Code: " + inputedTransactions.OrdinalNo + " " + inputedTransactions.CodeName}
                          value={inputedTransactions.OrdinalNo || ""}
                          type="number"
                          inputId="OrdinalNo"
                          name="OrdinalNo"
                          placeholder="Enter Code"
                          onChange={handleChange}
                          Icon={CgMore}
                          onIconClick={() => document.getElementById('ParmCodeModal').showModal()} />
                      </div>
                      <div className="md:flex w-full gap-10">
                        <Input
                          title="Amount"
                          value={inputedTransactions.Amt}
                          type="number"
                          inputId="Amt"
                          name="Amt"
                          step="0.01"
                          placeholder="Enter Employee Amount"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="md:flex w-full gap-10">
                        <Input
                          title={"Cost Code: " + inputedTransactions.costCodes + " " + inputedTransactions.BreakDesc}
                          value={inputedTransactions.costCodes || ""}
                          type="text"
                          inputId="costCodes"
                          name="costCodes"
                          placeholder="Cost Code"
                          onChange={handleChange}
                          Icon={CgMore}
                          onIconClick={() => document.getElementById('CostCodeModal').showModal()} />
                      </div>
                      <div className="form-control mx-auto py-3">
                        <label className="label cursor-pointer">
                          <input
                            type="checkbox"
                            name="toReplace"
                            checked={inputedTransactions.toReplace}
                            onChange={e => setInputedTransactions({ ...inputedTransactions, toReplace: e.target.checked })}
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
              >
                Save
              </button>
            </form>
          </div>
        </dialog>
        {showPopupMsg &&
          <PopupMsg message={popupContent} />
        }
        <TransactionEmployeePopup />
        <TransactionCostCodePopup />
        <TransactionParmCodesPopup />

      </>
  )
}

