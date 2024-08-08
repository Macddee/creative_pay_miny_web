import React from 'react'

export default function Highpresicionamounts() {
  return (
    <>
      <div className="overflow-x-auto  p-4">
        <div className="overflow-x-auto bg-slate-200 p-10 m-8 rounded-lg">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="hover">
                <td>Hourly Rate</td>
                <td>0.00</td>
              </tr>
              <tr className="hover">
                <td>Weekly Rate</td>
                <td>0.00</td>
              </tr>
              <tr className="hover">
                <td>Monthly Rate</td>
                <td>0.00</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </>
  )
}
