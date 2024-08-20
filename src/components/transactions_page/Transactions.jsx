import { useEffect, useState } from "react";
import Input from "../../styled/inputs";
import { CgMore, CgMoreAlt, CgMoreVertical, CgSearch } from "react-icons/cg";
import Error from "../Error";
import { TransactionCostCodePopup, TransactionEmployeePopup, TransactionParmCodesPopup } from "../SearchPopup";
import { useDataContexts } from "../../ContextProviders/DataContexts";

export default function Transactions() {

  const [errorMesage, setErrorMessage] = useState("")
  const [inputedBatches, setInputedBatches] = useState([])

  const {
    employee, setEmployee,
    allEmployees,
    parmCodes,
    costCodes,
    showError, setShowError,
    inputedTransactions, setInputedTransactions,
    savedTransactions, setSavedTransactions,
  } = useDataContexts()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputedTransactions((currentTrans) => ({
      ...currentTrans,
      [name]: value,
    }));
  };

  // function updateEmployee(updatedEmployee) {
  //   setEmployee(prevEmployees =>
  //     prevEmployees.map(employee =>
  //       employee.EmpNo === updatedEmployee.EmpNo ? updatedEmployee : employee
  //     )
  //   );
  // }


  const handleSubmit = ((e) => {
    e.preventDefault();

    // updateEmployee(employee)
    const existingItem = inputedBatches.find(item => item.EmpNo === inputedTransactions.EmpNo && item.CodeName === inputedTransactions.CodeName);
    console.log(inputedBatches);
    if (existingItem) {

      if (inputedTransactions.toReplace) {

        if (existingItem.Amt != inputedTransactions.Amt) {
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
        } else {
          setErrorMessage("Record already replaced!.")
          setShowError(() => (true))

        }
      } else {
        setErrorMessage("Cannot duplicate records. Try replacing.")
        setShowError(() => (true))
      }

    } else {
      setInputedBatches(prevBatches => [...prevBatches, inputedTransactions]);
    }
    console.log(inputedTransactions)
    console.log(inputedBatches)
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
      // Return the modified object
      return itemCopy;
    });

    // Append the updated array to the savedTransactions
    setSavedTransactions(prevRef => prevRef.concat(modifiedBatch));
    console.log(savedTransactions);
  }

  return (
    <>
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
              {/* EmpNo: "",
              OrdinalNo: "",
              Amt: "",
              toReplace: false,
              batchNo: "",
              costCodes: "",
              time: "",
              CodeName: "",
              BreakDesc: "", */}
              {inputedBatches.map((item, index) => (
                <tr className="hover no-select " key={index}>
                  <td>{index + 1}</td>
                  <td>{item.EmpNo}</td>
                  <th>{item.CodeName}</th>
                  <td>{item.Amt}</td>
                  <td>{item.dgCostCode}</td>
                  <td>{item.toReplace ? "True" : "False"}</td>
                </tr>
              ))
              }
            </tbody>
          </table>
        </div>

        <button
          type="submit"
          className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-8"
          onClick={() => document.getElementById('transactionModal').showModal()}
        >
          Add Amount
        </button>


        <button
          type="submit"
          className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-8"
          onClick={() => handleTransactionBatch(inputedBatches)}
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
                        title="Employee Number"
                        value={inputedTransactions.EmpNo}
                        type="text"
                        inputId="EmpNo"
                        name="EmpNo"
                        placeholder="Employee number"
                        onChange={handleChange}
                        Icon={CgSearch}
                        onIconClick={() => document.getElementById('transactionEmpModal').showModal()} />

                    </div>
                    <div className="md:flex w-full gap-10">
                      <Input
                        title="Enter Code"
                        value={inputedTransactions.OrdinalNo + " " + inputedTransactions.CodeName}
                        type="text"
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
                        title="Cost Code"
                        value={inputedTransactions.costCodes + " " + inputedTransactions.BreakDesc}
                        type="text"
                        inputId="CostCodes"
                        name="CostCodes"
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
      <TransactionEmployeePopup />
      <TransactionCostCodePopup />
      <TransactionParmCodesPopup />

    </>
  )
}

