import React, { useEffect, useState } from 'react'
import Input from '../../styled/inputs'
import { CgSearch } from 'react-icons/cg'
import Choosepayrol from '../Choosepayrol';
import Chip from '../Chip';
import { useDataContexts } from '../../ContextProviders/DataContexts';
import PopupMsg from '../PopupMsg';
import Loading from '../Loading';

export default function Admin() {
  const [userData, setUserData] = useState({})
  const [chips, setChips] = useState([])
  const allPayrolls = ["DINSON", "MOSSFIELD", "EXECUTIVE"]

  const {
    token, postUrl,
    isLoading,
    setIsLoading,
    showPopupMsg, setShowPopupMsg,
    popupContent, setPopupContent,
  } = useDataContexts();


  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((currentTrans) => ({
      ...currentTrans,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   setUserData((prevData) => ({
  //     ...prevData,
  //     payroll: chips
  //   }))
  // }, [chips])


  function handleClickCallback(payroll) {
    setUserData(prevData => ({ ...prevData, payroll: payroll }))
    // setChips(prevChips => prevChips.concat(payroll))
  }

  function handleChipRemoveCallback(chipToRem) {
    setChips((prevChips) => prevChips.filter((chip) => chip !== chipToRem));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)

    const requestBody = JSON.stringify(userData)

    console.log(requestBody);

    fetch("https://payroll-dinson-backend.creativehr.co.zw/api/register", {
      method: 'POST',
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
        console.log(data.message, "in errororororororor")
        setIsLoading(false)
        // setPopupContent("Admin user successfully created!")
      })
      .catch(error => {
        setShowPopupMsg(true),
          setPopupContent(error.message)
        console.log(error.message)
        setIsLoading(false)
      });
  }

  return (
    isLoading
      ? <Loading />
      : <div className="bg-blue-100 p-5 py-10 rounded-lg relative block mt-1 ml-8 mr-8 flex-grow ">

        <h1 className="text-3xl text-center mb-5 font-bold mr-6">Create New Admin Users.</h1>
        <form onSubmit={handleSubmit}>
          <div className="md:flex flex-wrap">
            <div className="flex-1">
              <div className="mt-10">
                <div className="flex flex-col">
                  <div className="md:flex w-full gap-10">
                    <Input
                      title="Given Names"
                      value={userData.name || ""}
                      type="text"
                      inputId="name"
                      name="name"
                      placeholder="First And Or Second Names"
                      onChange={handleChange}
                      required={true}
                    />
                    <Input
                      title="Surname"
                      value={userData.surname || ""}
                      type="text"
                      inputId="surname"
                      name="surname"
                      placeholder="Surname"
                      onChange={handleChange}
                      required={true}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="md:flex w-full gap-10">
                  <Input
                    title="Initials"
                    value={userData.initials || ""}
                    type="text"
                    inputId="initials"
                    name="initials"
                    placeholder="D.N"
                    onChange={handleChange}
                    required={true}
                  />
                  <Input
                    title="Email Address"
                    value={userData.email || ""}
                    type="text"
                    inputId="email"
                    name="email"
                    placeholder="abcd@gmail.com"
                    onChange={handleChange}
                    required={true}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="md:flex w-full gap-10">
                  <Input
                    title="Passowrd"
                    value={userData.password || ""}
                    type="text"
                    inputId="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required={true}
                  />
                  <Input
                    title="Payroll rights"
                    value={userData.access_level || ""}
                    type="text"
                    inputId="access_level"
                    name="access_level"
                    placeholder="0-9"
                    onChange={handleChange}
                    
                  />
                </div>
              </div>
              <Input
                title="Payroll"
                value={userData.payroll || ""}
                type="text"
                inputId="payroll"
                name="payroll"
                placeholder="DISNON"
                onChange={handleChange}
                required={true}
                Icon={CgSearch}
                onIconClick={() => { document.getElementById("ChoosePayrol").showModal() }}

              />

              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-8"
                  onClick={() => {
                  }}
                >
                  Create Adminstrator User
                </button>
              </div>
            </div>
          </div>

          {
            chips.map((item, index) => (
              <Chip
                key={index}
                label={item}
                onRemove={handleChipRemoveCallback}
              />
            ))
          }
        </form>

        <Choosepayrol fromAdmin={true} allPayrolls={allPayrolls} callbackFunc={handleClickCallback} />
        {showPopupMsg &&
          <PopupMsg message={popupContent} />
        }
      </div>
  )
}
