import { useEffect, useState } from 'react'
import { useDataContexts } from '../ContextProviders/DataContexts';
// import { convertFromJulianToDateTime ,convertFromDateTimeToJulian } from "../../logic/EmployeeLogic";
import { convertFromJulianToDateTime, convertFromDateTimeToJulian } from './logic/EmployeeLogic';
import Input from '../styled/inputs';
import Error from './Error';
import { DiSafari } from 'react-icons/di';


export default function SearchPopup() {

  const {
    setEmployee,
    allEmployees,
    allEmployeeDetails,
    setemployeeDetails } = useDataContexts()

  return (
    <div>
      <dialog id="selectEmpModal" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold ">Select an employee </h1>
            <div>
              <button className="btn btn-sm btn-circle btn-ghost mb-5" onClick={() => document.getElementById('selectEmpModal').close()}>✕</button>
            </div>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th>EmpNo</th>
                  <th>Initials</th>
                  <th>Surname</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {allEmployees.map((item) => {
                  // Convert Julian dates to Gregorian dates
                  // const birthDate = convertFromJulianToDateTime(item.BirthDate);
                  // const engageDate = convertFromJulianToDateTime(item.EngageDate);
                  // // console.log(engageDate);

                  return (
                    <tr className="hover no-select" key={item.EmpNo} onClick={() => {
                      setEmployee({
                        ...item,
                      });
                      document.getElementById('selectEmpModal').close();

                      if (allEmployeeDetails) {
                        const employeeDetail = allEmployeeDetails.find(detail => detail.EmpNo === item.EmpNo) || {};
                        setemployeeDetails(employeeDetail)

                      }
                      // console.log(employeeDetails);
                    }}>
                      <th>{item.EmpNo}</th>
                      <td>{item.Inits}</td>
                      <td>{item.Surname}</td>
                      <td>{item.GivenNames}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export function CreateNewEmployee() {
  const {
    setEmployee,
    allEmployees, setAllEmployees,
    setemployeeDetails,
    setAllEmployeeDetails,
    showError, setShowError,
  } = useDataContexts()
  const [autoNumber, setAutoNumber] = useState(true)
  const [newEmployee, setNewEmployee] = useState({})
  const [newEmployeeID, setNewEmployeeID] = useState({})
  const [disbaleSave, setDisbaleSave] = useState(false)


  const handleChange = (e) => {
    const { name, value } = e.target;
    let newVal = value;

    if (name.includes("Date")) {
      newVal = convertFromDateTimeToJulian(value);
    }


    if (name === "EmpNo") {
      const index = allEmployees.findIndex(item => item.EmpNo === Number(value));

      if (index !== -1) {
        setShowError(true)
        setDisbaleSave(true)
      } else {
        setShowError(false)
        setDisbaleSave(false)
      }


      setNewEmployeeID(() => ({
        ...newEmployeeID,
        EmpNo: value
      }))
    }

    setNewEmployee((employee) => ({
      ...employee,
      [name]: newVal,
    }));
  };

  useEffect(() => {
    let lastEmpNo = allEmployees[allEmployees.length - 1];
    if (!lastEmpNo) return;
    lastEmpNo = lastEmpNo.EmpNo + 1;

    setNewEmployee(() => ({
      ...newEmployee,
      EmpNo: lastEmpNo
    }))

    setNewEmployeeID(() => ({
      ...newEmployeeID,
      EmpNo: lastEmpNo
    }))
  }, [autoNumber])


  const handleIdChange = (e) => {
    const { name, value } = e.target;
    setNewEmployeeID({
      ...newEmployeeID,
      [name]: value
    })
  }


  const handleSubmit = (e,) => {
    e.preventDefault();

    setEmployee(data => ({
      ...data,
      ...newEmployee
    }))

    setemployeeDetails(data => ({
      ...data,
      ...newEmployeeID
    }))

    setAllEmployees(prevDetails => prevDetails.concat(newEmployee));
    setAllEmployeeDetails(prevDetails => prevDetails.concat(newEmployeeID));
  }

  return (
    <div>
      <dialog id="AddNewEmployeeModal" className="modal flex-auto">
        <div className=" bg-slate-200 p-16 rounded-xl">
          <div className="inline-flex">
            <h1 className="text-3xl text-center mb-2 font-bold mr-60">Create An Employee </h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost text-red-600  mb-5">✕</button>
            </form>
          </div>
          <form onSubmit={(e) => {
            handleSubmit(e);
            document.getElementById('AddNewEmployeeModal').close();
          }}>
            <div className="md:flex gap-20 flex-wrap">
              <div className="flex-1">
                <div className="mt-10">
                  <div className="flex flex-col">
                    <div className="md:flex w-full gap-10">
                      <div className="md:flex w-full gap-10">
                        <Input
                          title="Given Names"
                          value={newEmployee.GivenNames}
                          type="text"
                          inputId="GivenNames"
                          name="GivenNames"
                          placeholder="Name 1, Name 2..."
                          onChange={handleChange}
                          required={true}
                        />
                      </div>
                      <div className="md:flex w-full gap-10">
                        <Input
                          title="Surname"
                          value={newEmployee.Surname}
                          type="text"
                          inputId="Surname"
                          name="Surname"
                          placeholder="Family Name"
                          required={true}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="md:flex w-full gap-10">
                      <div className="md:flex w-full gap-10">
                        <Input
                          title="Initials"
                          value={newEmployee.Inits}
                          type="text"
                          inputId="Inits"
                          name="Inits"
                          placeholder="M.M"
                          required={true}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="md:flex w-full gap-10">
                        <Input
                          title="ID Number"
                          value={newEmployee.PassportCountry}
                          type="text"
                          inputId="PassportCountry"
                          name="PassportCountry"
                          placeholder="XX-XXXXXXXKXX"
                          required={true}
                          onChange={handleIdChange}
                        />
                      </div>
                    </div>
                    <div className="md:flex w-full gap-10">
                      <div className="md:flex w-full gap-10">
                        <Input
                          title="Date of Birth"
                          value={convertFromJulianToDateTime(newEmployee.BirthDate)}
                          type="date"
                          inputId="BirthDate"
                          name="BirthDate"
                          required={true}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="md:flex w-full gap-10">
                        <Input
                          title="Engagement Date"
                          value={convertFromJulianToDateTime(newEmployee.EngageDate)}
                          type="date"
                          inputId="EngageDate"
                          name="EngageDate"
                          required={true}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Input
                          title="Employee Number: "
                          value={newEmployee.EmpNo || ""}
                          type="number"
                          inputId="EmpNo"
                          name="EmpNo"
                          disabled={autoNumber}
                          required={true}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-control">
                        <label className="label cursor-pointer flex items-center">
                          <input
                            type="checkbox"
                            name="toReplace"
                            checked={autoNumber}
                            onChange={e => { setAutoNumber(e.target.checked) }}
                            className="checkbox checkbox-primary mr-2"
                          />
                          <span className="label-text text-lg">Auto assign employee number</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Error inoformation popup. */}
            {showError &&
              <div className="pb-6 pt-3">
                <Error message={"That ID number already exist, please choose another one."} />
              </div>
            }

            <button
              type="submit"
              className=" mt-4 w-full mx-auto btn bg-blue-400 hover:bg-blue-200 outline-blue-600 text-black border-blue-600"
              disabled={disbaleSave}
            >
              Save
            </button>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export function MasterfileEmployeePopup() {
  const {
    allEmployees,
    inputedAmounts, setInputedAmounts
  } = useDataContexts()
  return (
    <div>
      <dialog id="masterfileEmpModal" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold ">Masterfile Batch Maintance</h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th>EmpNo</th>
                  <th>Initials</th>
                  <th>Surname</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {allEmployees.map((item) => {
                  return (
                    <tr className="hover no-select" key={item.EmpNo} onClick={() => {
                      setInputedAmounts({
                        ...inputedAmounts,
                        EmpNo: item.EmpNo,
                        EmpNames: item.Surname + " " + item.GivenNames
                      });
                      document.getElementById('masterfileEmpModal').close();
                    }}>
                      <th>{item.EmpNo}</th>
                      <td>{item.Inits}</td>
                      <td>{item.Surname}</td>
                      <td>{item.GivenNames}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </div>
  )
}
export function TransactionEmployeePopup() {
  const {
    allEmployees,
    inputedTransactions, setInputedTransactions,
  } = useDataContexts()
  return (
    <div>
      <dialog id="transactionEmpModal" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold ">Masterfile Batch Maintance</h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th>EmpNo</th>
                  <th>Initials</th>
                  <th>Surname</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {allEmployees.map((item) => {
                  return (
                    <tr className="hover no-select" key={item.EmpNo} onClick={() => {
                      setInputedTransactions({
                        ...inputedTransactions,
                        EmpNo: item.EmpNo,
                      });
                      document.getElementById('transactionEmpModal').close();
                    }}>
                      <th>{item.EmpNo}</th>
                      <td>{item.Inits}</td>
                      <td>{item.Surname}</td>
                      <td>{item.GivenNames}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </div>
  )
}


export function TransactionParmCodesPopup() {
  const {
    parmCodes,
    inputedTransactions, setInputedTransactions,
  } = useDataContexts()

  return (
    <>
      <dialog id="ParmCodeModal" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold mr-5 ">Select Parmeter Code</h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th>Paramater Code</th>
                </tr>
              </thead>
              <tbody>
                {parmCodes
                  .filter(item => item.QmfDisplayInd === "N")
                  .map((item) => (
                    <tr className="hover no-select" key={item.OrdinalNo} onClick={() => {
                      setInputedTransactions({
                        ...inputedTransactions,
                        CodeName: item.CodeName,
                        OrdinalNo: item.OrdinalNo,
                        Limit: item.Limit,
                      });
                      document.getElementById('ParmCodeModal').close();
                    }}>
                      <td>{item.OrdinalNo + "  " + item.CodeName}</td>
                    </tr>
                  )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </>
  )
}

export function MasterfileParmCodesPopup() {
  const {
    parmCodes,
    inputedTransactions, setInputedTransactions,
  } = useDataContexts()

  return (
    <>
      <dialog id="MasterfileParmCodeModal" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold mr-5 ">Select Parmeter Code</h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th>Paramater Code</th>
                </tr>
              </thead>
              <tbody>
                {parmCodes
                  .filter(item => item.QmfDisplayInd === "Y")
                  .map((item) => (
                    <tr className="hover no-select" key={item.OrdinalNo} onClick={() => {
                      setInputedTransactions({
                        ...inputedTransactions,
                        CodeName: item.CodeName,
                        OrdinalNo: item.OrdinalNo,
                        Limit: item.Limit,
                      });
                      document.getElementById('MasterfileParmCodeModal').close();
                      console.log(inputedTransactions);
                    }}>
                      <td>{item.OrdinalNo + "  " + item.CodeName}</td>
                    </tr>
                  )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </>
  )
}

export function TransactionCostCodePopup() {
  const {
    costCodes,
    inputedTransactions, setInputedTransactions,
  } = useDataContexts()

  return (
    <>
      <dialog id="CostCodeModal" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold mr-5 ">Select Cost Code </h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th>Cost Code</th>
                </tr>
              </thead>
              <tbody>
                {costCodes.map((item) => {
                  return (
                    <tr className="hover no-select" key={item.OrdinalNo} onClick={() => {
                      setInputedTransactions({
                        ...inputedTransactions,
                        costCodes: item.BreakCode,
                        BreakDesc: item.BreakDesc,
                      });
                      document.getElementById('CostCodeModal').close();

                    }}>
                      <td>{item.BreakCode + "  " + item.BreakDesc}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </>
  )
}

export function CompanyCostCodePopup({ fromEditRights = false, handleCostCodeSelectCallback = null }) {

  const {
    costCodes,
    employee, setEmployee } = useDataContexts()

  return (
    <>
      <dialog id="CompanyCodeModal" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold mr-5 ">Select Bank Sort Code </h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th>Sort Code</th>
                </tr>
              </thead>
              <tbody>
                {costCodes.map((item, index) => {
                  if (!fromEditRights) {
                    return (
                      <tr className="hover no-select" key={index} onClick={() => {
                        setEmployee({
                          ...employee,
                          CostCodes: item.BreakCode
                        });
                        document.getElementById('CompanyCodeModal').close();
                      }}>
                        <td>{item.BreakCode + "  " + item.BreakDesc}</td>
                      </tr>
                    );
                  } else {
                    // console.log("did we make it here");

                    return (
                      <tr className="hover no-select" key={index} onClick={() => {
                        handleCostCodeSelectCallback(item.BreakCode)
                        document.getElementById('CompanyCodeModal').close();
                      }}>
                        <td>{item.BreakCode + "  " + item.BreakDesc}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </>
  )
}

export function PayPointPopup({ handlePayPointSelectCallback = null, availablePaypoints = [] }) {
  const {
    employee, setEmployee,
    payPoint } = useDataContexts()

  return (
    <>
      <dialog id="PayPointModal" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold mr-5 ">Select Pay Point </h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th>Pay Point</th>
                </tr>
              </thead>
              <tbody>
                {
                  !handlePayPointSelectCallback
                    ? payPoint.map((item, index) => {

                      return (
                        <tr className="hover no-select" key={item.OrdinalNo} onClick={() => {
                          setEmployee({
                            ...employee,
                            PayPoint: item.PaypointName
                          });
                          document.getElementById('PayPointModal').close();
                        }}>
                          <td>{item.OrdinalNo + "  " + item.PaypointName}</td>
                        </tr>
                      );
                    })

                    : availablePaypoints.map((item, index) => {
                      return (
                        <tr className="hover no-select" key={index} onClick={() => {
                          handlePayPointSelectCallback(item)
                          document.getElementById('PayPointModal').close();
                        }}>
                          <td>{index + " " + item}</td>
                        </tr>
                      );

                    })
                }

              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </>
  )
}

export function OccupationCodePopup() {
  const { employee, setEmployee } = useDataContexts()
  const { occupationCodes } = useDataContexts()


  return (
    <>
      <dialog id="OccupationCodeModal" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold mr-5 ">Select Occupation Code </h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th>Occupation Code</th>
                </tr>
              </thead>
              <tbody>
                {occupationCodes.map((item, index) => {
                  return (
                    <tr className="hover no-select" key={index} onClick={() => {
                      setEmployee({
                        ...employee,
                        Occup: item.Description
                      });
                      document.getElementById('OccupationCodeModal').close();

                    }}>
                      <td>{item.Description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </>
  )
}


export function BankSortCodePopup() {

  const {
    allBanksData,
    employee,
    inputedBankData, setInputedBankData } = useDataContexts()

  return (
    <>
      <dialog id="BankSortCodeModal" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold mr-5 ">Select Bank Sort Code </h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th>Sort Code</th>
                </tr>
              </thead>
              <tbody>
                {allBanksData.map((item, index) => {
                  return (
                    <tr className="hover no-select" key={index} onClick={() => {
                      setInputedBankData({
                        ...inputedBankData,
                        DestinBankSortCode: item.BankSortCode,
                        BranchName: item.BranchName,
                        EmpNo: employee.EmpNo,

                      });
                      document.getElementById('BankSortCodeModal').close();

                    }}>
                      <td>{item.BankSortCode + "  " + item.BranchName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </>
  )
}

export function BankPayModePopup() {
  const { inputedBankData, setInputedBankData, payMode } = useDataContexts()


  return (
    <>
      <dialog id="BankPayModeModal" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold mr-5 ">Select Bank Pay Mode </h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th>Pay Mode</th>
                </tr>
              </thead>
              <tbody>
                {payMode.map((item, index) => {
                  return (
                    <tr className="hover no-select" key={index} onClick={() => {
                      setInputedBankData({
                        ...inputedBankData,
                        PayMode: item.symbol,
                        Mode: item.mode
                      });
                      document.getElementById('BankPayModeModal').close();

                    }}>
                      <td>{item.symbol + "   " + item.mode}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </>
  )
}

export function BankAccHolderPopup() {
  const { inputedBankData, setInputedBankData, accHolder } = useDataContexts()


  return (
    <>
      <dialog id="BankAccHolderModal" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold mr-5 ">Select Bank Pay Mode </h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th>Account Holder</th>
                </tr>
              </thead>
              <tbody>
                {accHolder.map((item, index) => {
                  return (
                    <tr className="hover no-select" key={index} onClick={() => {
                      setInputedBankData({
                        ...inputedBankData,
                        AccountHolderStatus: item.OrdinalNo,
                        Holder: item.holder
                      });
                      document.getElementById('BankAccHolderModal').close();
                    }}>
                      <td>{item.OrdinalNo + "   " + item.holder}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </>
  )
}


export function AddIndicatorsPopup() {
  const { inputedEmployeeIndicator, setInputedEmployeeIndicator } = useDataContexts()
  const { primaryIndicators } = useDataContexts()
  const { employee } = useDataContexts()
  const { setSelectedIndicators } = useDataContexts()

  return (
    <>
      <dialog id="AddIndicatorsModal" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold mr-5 ">Add Indicator Details.</h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th>Indicator</th>
                </tr>
              </thead>
              <tbody>
                {primaryIndicators.map((item, index) => {
                  return (
                    <tr className="hover no-select" key={index} onClick={() => {
                      setInputedEmployeeIndicator({
                        ...inputedEmployeeIndicator,
                        OrdinalNo: item.IndicatorNo,
                        EmpNo: employee.EmpNo,
                      });
                      setSelectedIndicators({
                        IndicatorValue: item.IndVal
                      });
                      console.log(item);
                      document.getElementById('AddIndicatorsModal').close();
                    }}>
                      <td>{item.IndicatorNo + "   " + item.IndName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </>
  )
}


export function AddIndValPopup() {
  const { inputedEmployeeIndicator, setInputedEmployeeIndicator } = useDataContexts()
  const { setSelectedIndicators } = useDataContexts()
  const { allIndicators } = useDataContexts()

  return (
    <>
      <dialog id="AddIndValModal" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold mr-5 ">Indicator Options.</h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th>Indicator Value</th>
                  <th>Indicator Value Name</th>
                </tr>
              </thead>
              <tbody>
                {allIndicators.filter(item => item.IndicatorNo === inputedEmployeeIndicator.OrdinalNo).map((item, index) => {
                  return (
                    <tr className="hover no-select" key={index} onClick={() => {
                      setInputedEmployeeIndicator({
                        ...inputedEmployeeIndicator,
                        Ind: item.IndVal,
                      });
                      setSelectedIndicators({
                        IndicatorValue: item.IndVal
                      });
                      document.getElementById('AddIndValModal').close();
                    }}>
                      <td>{item.IndVal}</td>
                      <td>{item.IndValName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </>
  )
}


export function AddRefPopup() {
  const { inputedRef, setInputedRef } = useDataContexts()
  const { referencesData } = useDataContexts()
  const { employee } = useDataContexts()

  return (
    <>
      <dialog id="AddRefModal" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold mr-5 ">Add Reference Data</h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th>Cost Code</th>
                </tr>
              </thead>
              <tbody>
                {referencesData.map((item) => {
                  return (
                    <tr className="hover no-select" key={item.OrdinalNo} onClick={() => {
                      setInputedRef({
                        ...inputedRef,
                        OrdinalNo: item.OrdinalNo,
                        RefNoName: item.RefNoName,
                        EmpNo: employee.EmpNo
                      })
                      document.getElementById('AddRefModal').close();
                    }}>
                      <td>{item.OrdinalNo + "  " + item.RefNoName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </>
  )
}

export function AddDatePopup() {
  const { inputedDate, setInputedDate } = useDataContexts()
  const { datesData } = useDataContexts()
  const { employee } = useDataContexts()

  return (
    <>
      <dialog id="AddDateNameModal" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold mr-5 ">Add Date Data</h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th>Date Name</th>
                </tr>
              </thead>
              <tbody>
                {datesData.map((item) => {
                  return (
                    <tr className="hover no-select" key={item.OrdinalNo} onClick={() => {
                      setInputedDate({
                        ...inputedDate,
                        OrdinalNo: item.OrdinalNo,
                        DateName: item.DateName,
                        EmpNo: employee.EmpNo
                      })
                      document.getElementById('AddDateNameModal').close();
                    }}>
                      <td>{item.OrdinalNo + "  " + item.DateName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </>
  )
}


export function AddAmountPopup(fromMaster = "no") {
  const {
    employee,
    parmCodes,
    inputedAmounts, setInputedAmounts, }
    = useDataContexts()

  return (
    <>
      <dialog id="AddCodeModal" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold mr-5 ">Add Amount Details</h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th>Amount Name</th>
                </tr>
              </thead>
              <tbody>
                {parmCodes
                  .filter(item => item.QmfDisplayInd === "Y")
                  .map((item) => (
                    <tr className="hover no-select" key={item.OrdinalNo} onClick={() => {

                      if (fromMaster.fromMaster === "no") {
                        setInputedAmounts({
                          ...inputedAmounts,
                          OrdinalNo: item.OrdinalNo,
                          CodeName: item.CodeName,
                          Limit: item.Limit,
                          EmpNo: employee.EmpNo,
                        });
                      } else {
                        setInputedAmounts({
                          ...inputedAmounts,
                          OrdinalNo: item.OrdinalNo,
                          CodeName: item.CodeName,
                          Limit: item.Limit,

                        });
                      }
                      document.getElementById('AddCodeModal').close();
                    }}>
                      <td>{item.OrdinalNo + "  " + item.CodeName}</td>
                    </tr>

                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </>
  )
}