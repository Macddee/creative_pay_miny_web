import React from 'react'

export default function Amounts() {
  return (
    <>
      <div className="overflow-x-auto  p-4">
        <div className="overflow-x-auto bg-slate-200 p-10 m-8 rounded-lg">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
                <th>OrdinalNo</th>
                <th>CodeName</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="hover">
                <td>23</td>
                <td>Ordi Name</td>
                <td>0.00</td>
              </tr>
              <tr className="hover">
                <td>23</td>
                <td>Ordi Name</td>
                <td>0.00</td>
              </tr>
              <tr className="hover">
                <td>23</td>
                <td>Ordi Name</td>
                <td>0.00</td>
              </tr>
              
              </tbody>
          </table>

        </div>

        <button
          type="submit"
          className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-8"
        >
          Add Amount
        </button>
        <button
          type="submit"
          className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-8"
        >
          Save
        </button>
      </div>
    </>
  )
}
