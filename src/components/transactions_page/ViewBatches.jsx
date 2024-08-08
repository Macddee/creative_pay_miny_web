import React from 'react'

export default function ViewBatches() {

    const handleClick = () =>{
        const handleMethod = () =>{
            console.trace()
        }
        // console.log({"dfda": "dfsa", "dfcs":"Dsacf"})
        // console.dir({"dfda": "dfsa", "dfcs":"Dsacf"})
        handleMethod()
    }
    return (
        <>
        <button onClick={handleClick}>
fsv
        </button>
            <div className="overflow-x-auto  p-4">
                <div className="overflow-x-auto bg-slate-200 p-10 m-8 rounded-lg">
                    <table className="table ">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Batch Date</th>
                                <th>Time Saved</th>
                                <th>Edit</th>
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
            </div>
        </>
    )
}

