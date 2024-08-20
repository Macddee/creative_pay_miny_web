import React, { useState } from 'react'
import { useDataContexts } from '../../../ContextProviders/DataContexts'



export default function Highpresicionamounts() {
  const { employee } = useDataContexts()
  const { amounts } = useDataContexts()
  const { parmCodes } = useDataContexts()

  return (
    <>
      <div className="overflow-x-auto  p-4">
      <div className="flex flex-col h-[28rem] overflow-y-auto overflow-x-auto bg-slate-200 p-5 m-8 rounded-lg">
          <table className="table overflow-y-auto overflow-x-auto">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {amounts.filter(item => item.EmpNo === employee.EmpNo).map((item, index) => {
                const codeNames = ["S-Rate-Monthly", "S-Rate-Day", "S-Rate-Week"];
                const parmItem = parmCodes.find(parm => parm.OrdinalNo === item.OrdinalNo && codeNames.includes(parm.CodeName));

                if (!parmItem) {
                  return null; // Skip this iteration if no matching parmItem was found
                }

                return (
                  <tr className="hover no-select" key={index}>
                    <td>{"Not found"}</td>
                    {/* <td>{"Not found"}</td> */}
                    <td>{parmItem && parmItem.CodeName === "S-Rate-Monthly" ? amounts.Amt : ''}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
