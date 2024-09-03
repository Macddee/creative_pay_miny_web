import React from 'react'
import { useAuth } from '../auth/auth';
import { useDataContexts } from '../ContextProviders/DataContexts';
import { useLocation, useNavigate } from "react-router-dom";

export default function Choosepayrol({fromAdmin=false, allPayrolls=[], callbackFunc=null}) {
  const { payroll } = useAuth();
  const { selectePayroll, setSelectePayroll } = useDataContexts()
  const location = useLocation()
  const navigate = useNavigate()
  
  const redirectPath = location.state?.path || "/employees"


  return (
    <>
      <dialog id="ChoosePayrol" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold mr-5 ">Select Your Payroll From The List.</h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th>Payroll</th>
                </tr>
              </thead>
              <tbody>
                {fromAdmin ? (
                  allPayrolls.map((item, index) => (
                    <tr
                      className="hover no-select"
                      key={index}
                      onClick={() => {
                        console.log("clicked");
                        callbackFunc(item)
                      }}
                    >
                      <td>{index + 1 + "  " + item}</td>
                    </tr>
                  ))
                ) : (
                  payroll.map((item, index) => (
                    <tr
                      className="hover no-select"
                      key={index}
                      onClick={() => {
                        setSelectePayroll(item);
                        navigate(redirectPath, { replace: true });
                        localStorage.setItem('selectedPayroll', item);
                        document.getElementById('ChoosePayrol').close();
                      }}
                    >
                      <td>{index + 1 + "  " + item}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </>
  )
}
