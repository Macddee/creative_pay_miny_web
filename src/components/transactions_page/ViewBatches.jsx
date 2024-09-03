import React from 'react'
import Loading from '../Loading'
import PopupMsg from '../PopupMsg'
import { useDataContexts } from '../../ContextProviders/DataContexts';

export default function ViewBatches() {
  const {
    isLoading,
    showPopupMsg,
    popupContent,
    transactions,
  } = useDataContexts();
  return (
    isLoading
      ? <Loading />
      : <>
      <div className="overflow-x-auto  p-4">
        <div className="flex flex-col h-[28rem] overflow-y-auto overflow-x-auto bg-slate-200 p-5 m-8 rounded-lg">
          <table className="table overflow-y-auto overflow-x-auto">
            <thead>
              <tr>
              <th>Batch Date</th>
                <th>Time Saved</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item, index) => {
                console.log(item)
                return (
                  <tr className="hover no-select" key={index}>
                    <td>{item.batchNo}</td>
                    <td>{item.time}</td>
                    <td>
                      {
                      }
                    </td>
                    <td>
                      {
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>
      </div>

      {showPopupMsg &&
          <PopupMsg message={popupContent} />
        }
    </>
  )
}


