import React, { useDeferredValue, useEffect, useRef, useState } from 'react'
import Choosepayrol from '../Choosepayrol';
import { useDataContexts } from '../../ContextProviders/DataContexts';
import PopupMsg from '../PopupMsg';
import Loading from '../Loading';
import Input from '../../styled/inputs';
import { CompanyCostCodePopup, PayPointPopup } from '../SearchPopup';
import { CgSearch } from 'react-icons/cg';
import { FaCloudUploadAlt } from 'react-icons/fa';

export default function EditRights() {
  const [payrollUsers, setPayrollUsers] = useState([])
  const [payrollRights, setPayrollRights] = useState([])
  const [allPayroll, setAllPayroll] = useState([])
  const [allPaypoints, setAllPaypoints] = useState([])
  const [currentRights, setCurrentRights] = useState("")
  const [showInput, setShowInput] = useState({ row: null, column: null })
  const [keyPress, setKeyPress] = useState()
  const [clickOnce, setClickOnce] = useState(true)
  const [compledRows, setCompletedRows] = useState([])
  const [ isERLoading, setIsERLoading,] = useState(false)
  

  const {
    token,
    showPopupMsg, setShowPopupMsg,
    popupContent, setPopupContent,
  } = useDataContexts();

  useEffect(() => {
    const fetchData = async () => {
      setIsERLoading(true); // Set loading to true before starting the fetch request
      try {
        const response = await fetch("https://payroll-dinson-backend.creativehr.co.zw/api/get-payroll-data", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.message}`);
        }
        setPopupContent("Payroll Information Successifuly Fetched!.");
        setShowPopupMsg(true);
        const data = await response.json();
        setPayrollUsers(data.payroll_users);
        setPayrollRights(data.payroll_rights);
        setAllPayroll(data.all_payrolls);
        setAllPaypoints(data.all_paypoints)

      } catch (error) {
        if (error.message === 'Failed to fetch') {
          setPopupContent('Network error: Please check your internet connection.');
        } else {
          setPopupContent('Error:', error);
        }
        setShowPopupMsg(true);

      } finally {
        setIsERLoading(false); // Set loading to false after the request completes
      }
    };
    fetchData();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentRights((currentRight) => ({
      ...currentRight,
      [name]: value,
    }));
  };

  function handleSubmit() {
    setIsERLoading(true)
    const requestBody = JSON.stringify({
      "rows": compledRows
    });

    console.log(requestBody);

    fetch("https://payroll-dinson-backend.creativehr.co.zw/api/edit-payroll-rights", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },

      body: requestBody
    })
      .then(response => response.json())
      .then(data => {
        setShowPopupMsg(true)
        setPopupContent(data.message)
        setIsERLoading(false)
      })
      .catch(error => {
        setShowPopupMsg(true),
          setPopupContent(error.message)
        console.log(error.message)
        setIsERLoading(false)
      });
  }

  const handleCellClick = (foundRights, rowIndex, column) => {
    if (!clickOnce) return;

    setCurrentRights(foundRights)
    setShowInput(({ row: rowIndex, column: column }))
    setClickOnce(false)
  };

  useEffect(() => {
    console.log(currentRights);
    setPayrollRights((prevRights) => (
      prevRights.map((right) => {
        if (right.user_id === currentRights.user_id) {
          return {
            ...right,
            ...currentRights
          };
        }
        return right;
      })
    ));
  }, [keyPress, currentRights])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setKeyPress(true)
      setClickOnce(true)
      setShowInput({})
    } else if (e.key === 'Escape') {
      setKeyPress(true)
      setClickOnce(true)
      setShowInput({})
    }
    handleRowChangeSave()
  };

  const handleCostCodeSelectCallback = (costcode) => {
    setCurrentRights((prevRights) => ({
      ...prevRights,
      costcode: costcode
    }))
  }

  const handlePayPointSelectCallback = (paypoint) => {
    setCurrentRights((prevRights) => ({
      ...prevRights,
      paypoint: paypoint
    }))
  }

  const handleRowChangeSave = () => {
    const newRights = {
      id: currentRights.id,
      user_id: currentRights.user_id,
      payroll: currentRights.payroll,
      paypoint: currentRights.paypoint,
      costcode: currentRights.costcode,
    };

    setCompletedRows(prevRows => {
      const rowIndex = prevRows.findIndex(row => row.user_id === newRights.user_id);

      if (rowIndex !== -1) {
        // Merge with existing row
        const updatedRows = [...prevRows];
        updatedRows[rowIndex] = { ...updatedRows[rowIndex], ...newRights };
        return updatedRows;
      } else {
        console.log("// Add new row")
        return [...prevRows, newRights];
      }
    });
  };


  return (
    isERLoading
      ? <Loading />
      : <>
        <div className="flex flex-col h-[28rem] overflow-y-auto overflow-x-auto bg-slate-200 p-5 m-8 rounded-lg">
          <table className="table overflow-y-auto overflow-x-auto">
            <thead>
              <tr>
                <th>User ID</th>
                <th>First Name</th>
                <th>Surname</th>
                <th>Payroll</th>
                <th>Cost Code</th>
                <th>Paypoint</th>
                <th>Access Level</th>
              </tr>
            </thead>
            <tbody>
              {payrollUsers.map((item, rowIndex) => {
                const foundRights = payrollRights.find(right => item.id === right.user_id)
                return (
                  <tr className="hover no-select " key={rowIndex}>
                    <td>{item.id}</td>

                    <td>{item.name}</td>

                    <td>{item.surname}</td>

                    <td
                      onClick={() => { handleCellClick(foundRights, rowIndex, "payroll"); }}
                    >
                      {showInput.row == rowIndex && showInput.column == "payroll"
                        ? <Input
                          value={currentRights?.payroll || ""}
                          type="text"
                          inputId="payroll"
                          name="payroll"
                          onKeyDown={handleKeyDown}
                          onChange={handleChange} />
                        : (foundRights?.payroll || "")
                      }
                    </td>

                    <td
                      onClick={() => { handleCellClick(foundRights, rowIndex, "costcode"); }}
                    >
                      {showInput.row == rowIndex && showInput.column == "costcode"
                        ? <Input
                          value={currentRights?.costcode || ""}
                          type="text"
                          inputId="costcode"
                          name="costcode"
                          onKeyDown={handleKeyDown}
                          onChange={handleChange}
                          Icon={CgSearch}
                          onIconClick={() => { document.getElementById("CompanyCodeModal").showModal() }} />
                        : (foundRights?.costcode || "")
                      }
                    </td>
                    <td
                      onClick={() => { handleCellClick(foundRights, rowIndex, "paypoint"); }}
                    >
                      {showInput.row == rowIndex && showInput.column == "paypoint"
                        ? <Input
                          value={currentRights?.paypoint || ""}
                          type="text"
                          inputId="paypoint"
                          name="paypoint"
                          onKeyDown={handleKeyDown}
                          onChange={handleChange}
                          Icon={CgSearch}
                          onIconClick={() => { document.getElementById("PayPointModal").showModal() }} />
                        : (foundRights?.paypoint || "")
                      }
                    </td>
                    <th>{item.access_level}</th>
                  </tr>
                )
              })}

            </tbody>
          </table>

        </div>
        <div className="bg-gray-100 p-8 rounded-lg mb-2 text-gray-700">
          <div className="flex justify-between items-center">
            <div >
              <h2 className="text-xl font-bold">Instructions for editing:</h2>
              <p>1. Click a field to start editing.</p>
              <p>2. Press Enter to save or Escape to cancel.</p>
              {/* <p>3. Press Upload Edited Row to save changes made on the current row.</p>
                  <p>4. Proceeding to the next row without Uploading will overwrite your previous data.</p> */}
            </div>

            <div className="ml-auto pr-6">
              <button
                type="button"
                className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600"
                onClick={() => {
                  handleSubmit()
                }}
              >
                <span className="text-black text-2xl"><FaCloudUploadAlt /></span> Upload Edited Data
              </button>
            </div>
          </div>
        </div>



        {/* <Choosepayrol fromAdmin={true} allPayrolls={""} callbackFunc={""} /> */}
        {showPopupMsg &&
          <PopupMsg message={popupContent} />
        }

        < CompanyCostCodePopup fromEditRights={true} handleCostCodeSelectCallback={handleCostCodeSelectCallback} />
        < PayPointPopup handlePayPointSelectCallback={handlePayPointSelectCallback} availablePaypoints={allPaypoints} />
      </>
  )
}
