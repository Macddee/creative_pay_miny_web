import React from 'react'

export default function Indicators() {
  return (
    <>
      <div className="overflow-x-auto  p-4">
        <div className="overflow-x-auto bg-slate-200 p-10 m-8 rounded-lg">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Indicator NUmber</th>
                <th>Indicator Name</th>
                <th>Indicator Value</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="hover">
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
              </tr>
              {/* row 2 */}
              <tr className="hover">
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
              </tr>
              {/* row 3 */}
              <tr className="hover">
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
              </tr>
            </tbody>
          </table>

        </div>

        <button
          type="submit"
          className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-8"
        >
          Add Indicator Data
        </button>
      </div>
    </>
  )
}
