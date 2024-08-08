import React from 'react'

export default function Banking() {
  return (
    <>
      <div className="overflow-x-auto  p-4">
        <div className="overflow-x-auto bg-slate-200 p-10 m-8 rounded-lg">
          <table className="table ">
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
              {/* row 1 */}
              <tr className="hover">
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr className="hover">
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr className="hover">
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>

        </div>

        <button
          type="submit"
          className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-8"
        >
          Add Bank Details
        </button>
      </div>
    </>
  )
}
