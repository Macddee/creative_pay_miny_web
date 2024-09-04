import { BankAccHolderPopup, BankPayModePopup, BankSortCodePopup } from '../SearchPopup';
import { useDataContexts } from '../../ContextProviders/DataContexts';
import Input from '../../styled/inputs';
import { CgMore } from 'react-icons/cg';
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Loading from '../Loading';
import PopupMsg from '../PopupMsg';
import { useEffect, useState } from 'react';

export default function Banking() {
  const {
    showError,
    employeesBankDetails, setEmployeesBankDetails,
    allBanksData,
    inputedBankData, setInputedBankData,
    payMode, accHolder,
    employee,
    token, postUrl,
    isLoading,
    setIsLoading,
    showPopupMsg, setShowPopupMsg,
    popupContent, setPopupContent,
  } = useDataContexts()

  const [udatingFlag, setUdatingFlag] = useState(false)
  const filterdDetails = employeesBankDetails.filter(item => item.EmpNo === employee.EmpNo)
  const finalIndex = filterdDetails.length + 1;


  useEffect(() => {
    setInputedBankData(prevData => ({
      ...prevData,
      OrdinalNo: prevData.OrdinalNo + 1,
      EmpNo: employee.EmpNo
    }));
  }, [finalIndex])



  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputedBankData((bankDetail) => ({
      ...bankDetail,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmployee()
    if (udatingFlag) {
      setEmployeesBankDetails(prevDetails =>
        prevDetails.map(detail => {
          if (detail.EmpNo === inputedBankData.EmpNo) {
            return inputedBankData;
          }
          return detail;
        })
      );
    } else {
      setEmployeesBankDetails(prevDetails => prevDetails.concat(inputedBankData));
    }
  };

  const updateEmployee = () => {
    setIsLoading(true)

    const requestBody = JSON.stringify({
      "cp_bank_details": [inputedBankData]
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

  const prepareNewBankingDetail = () => {
    setInputedBankData(
      {
        AccountHolderStatus: "",
        DestinAccountType: "",
        DestinBankAccountName: "",
        DestinBankAccountNumber: "",
        DestinBankSortCode: "",
        EmpNo: null,
        OrdinalNo: null,
        PayMode: "",
        SARSBankAccount: "",
        SourceBankAccountNumber: "",
        SplitPayCode: ""
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
                {filterdDetails.map((item, index) => {
                  const bank = allBanksData.find(bankitem => bankitem.BankSortCode === item.DestinBankSortCode);
                  const type = accHolder.find(holder => holder.OrdinalNo === item.AccountHolderStatus);
                  const paymode = payMode.find(mode => mode.symbol === item.PayMode);


                  return (
                    <tr className="hover no-select" key={index} onClick={() => {
                    }}>
                      <td>{index + 1}</td>
                      <td>{item.DestinBankSortCode}</td>
                      <td>{bank.BranchName}</td>
                      <td>{item.DestinBankAccountName}</td>
                      <td>{item.DestinBankAccountNumber}</td>
                      <td>{type ? type.holder : "not available"}</td>
                      <td>{paymode ? paymode.mode : "not available"}</td>
                      <td>{item.SplitPayCode}</td>
                      <td>{item.AccountHolderStatus}</td>
                      <td>
                        <button type='button' onClick={() => {
                          document.getElementById('AddBankDetailModal').showModal()
                          setInputedBankData(item)
                          setUdatingFlag(true)
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
            onClick={() => {
              prepareNewBankingDetail()
              document.getElementById('AddBankDetailModal').showModal()
            }
            }
          >
            Add Bank Details
          </button>
        </div>

        <dialog id="AddBankDetailModal" className="modal flex-auto">
          <div className=" bg-slate-200 p-16 rounded-xl overflow-y-auto h-4/5">
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
                          title={"Sort Code: " + `${inputedBankData.DestinBankSortCode ?? ''} ${inputedBankData.BranchName ?? ''}`}
                          value={inputedBankData.DestinBankSortCode || ''}
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
                          title={"Pay Mode: " + `${inputedBankData.PayMode || ''} ${inputedBankData.Mode || ''}`}
                          value={inputedBankData.PayMode || ""}
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
                          title={"Account Holder Status: " + `${inputedBankData.AccountHolderStatus ?? ''} ${inputedBankData.Holder ?? ''}`}
                          value={inputedBankData.AccountHolderStatus || ''}
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
                          type="number"
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
        {showPopupMsg &&
          <PopupMsg message={popupContent} />
        }
        <BankSortCodePopup />
        <BankPayModePopup />
        <BankAccHolderPopup />
      </>
  )
}
