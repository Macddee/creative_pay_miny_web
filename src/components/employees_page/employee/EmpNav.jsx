import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Empcontact from './Empcontact';
import Empaddress from './Empaddress';
import HomeEmploy from './HomeEmploy';
import Emppass from './Emppass';
import { useDataContexts } from '../../../ContextProviders/DataContexts';
import { Button } from 'flowbite-react';
import { CreateNewEmployee } from '../../SearchPopup';
import Loading from '../../Loading';
import PopupMsg from '../../PopupMsg';
import { FaCloudUploadAlt } from 'react-icons/fa';

export default function EmpNav() {
  const {
    employee, setEmployee,
    employeeDetails, setemployeeDetails,
    token, postUrl,
    isLoading,
    setIsLoading,
    showPopupMsg, setShowPopupMsg,
    popupContent, setPopupContent,
  } = useDataContexts();
  const [selectedTab, setSelectedTab] = useState(0)
  const handleSelect = (index) => {
    setSelectedTab(index);
  };
  

  const updateEmployee = () => {
    setIsLoading(true)

    const requestBody = JSON.stringify({
      "cp_employee": [employee],
      "cp_employee_details": [employeeDetails]
    });

    console.log(requestBody); 

    fetch(postUrl, {
      method: 'PUT',
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
          console.log(data.message)
        setIsLoading(false)
      })
      .catch(error => {
        setShowPopupMsg(true),
          setPopupContent(error.message)
          console.log(error.message)
        setIsLoading(false)
      });
  }

  const prepareNewEmp = () => {

    setEmployee(
      {
        Addr1: "",
        Addr2: "",
        Addr3: "",
        Addr4: "",
        BirthDate: "",
        ClockNo: "",
        CostCodes: "",
        DirAmt: "",
        DirPercent: "",
        DischDate: "",
        DischRsn: "",
        DischThisPeriodInd: "",
        Email: "",
        EmpNo: "",
        EngageDate: "",
        EngageThisPeriodInd: "",
        GivenNames: "",
        HusbNames: "",
        Inits: "",
        JobCode: "",
        LeaveCode: "",
        Occup: "",
        Password: "",
        PayPoint: "",
        Payroll: "",
        PositionCode: "",
        PostCode: "",
        PrevEmpNo: "",
        PrevPayroll: "",
        StopFrom: "",
        StopTo: "",
        StrDeptCode: "",
        Surname: "",
        TakeOnClass: "",
        TaxCertIssued: "",
        TaxCode: "",
        TaxDependants: "",
        TaxOffice: "",
        TaxRef: "",
        TaxStatusDate: "",
        TelephoneNo: "",
        Title: ""
    })
    setemployeeDetails({ "Bu1_Unit": "",
      "Bu2_Complex": "",
      "Bu3_StreetNo": "",
      "Bu4_StreetName": "",
      "Bu5_Suburb": "",
      "Bu6_Town": "",
      "Bu7_PostCode": "",
      "Bu8_CountryCode": "",
      "CountryCode": "",
      "EmailAddress": "",
      "EmailPDF": "",
      "EmpNo": "",
      "PassportCountry": "",
      "PhoneBusiness": "",
      "PhoneCell": "",
      "PhoneFax": "",
      "PhoneHome": "",
      "Po_AddrType": "0",
      "Po_CareOfName": "",
      "Po_COAddr": "",
      "Po1_Unit": "",
      "Po10_POBranch": "",
      "Po11_PostCode": "",
      "Po12_CountryCode": "null",
      "Po2_Complex": "",
      "Po3_StreetNo": "",
      "Po4_StreetName": "",
      "Po5_Suburb": "",
      "Po6_Town": "",
      "Po7_BoxBagNo": "",
      "Po8_AgencySubUnit": "",
      "Po9_SpecialService": "",
      "Post_Line1": "",
      "Post_Line2": "",
      "Post_Line3": "",
      "Post_Line4": "",
      "PostCode": "",
      "Re1_Unit": "",
      "Re2_Complex": "",
      "Re3_StreetNo": "",
      "Re4_StreetName": "",
      "Re5_Suburb": "",
      "Re6_Town": "",
      "Re7_PostCode": "",
      "ResAsPostal": ""
    });
  }


  return (
    isLoading
      ? <Loading />
      : <div className="bg-slate-100 rounded flex-grow">
        <Tabs
          selectedIndex={selectedTab} onSelect={handleSelect}
        >
          <TabList
            className="flex justify-start list-none p-4 gap-6 bg-slate-100 pl-8"
          >
            <Tab
              className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 no-select p-2"
              selectedClassName="bg-blue-300 text-black rounded-md p-2"
            >
              Employee Details
            </Tab>

            <Tab
              className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 no-select p-2"
              selectedClassName="bg-blue-300 text-black rounded-md p-2"
              onSelect={(index) => console.log(index)}
            >
              Contact Details
            </Tab>

            <Tab
              className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 no-select p-2"
              selectedClassName="bg-blue-300 text-black rounded-md p-2">
              Postal Address
            </Tab>

            <Tab
              className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 no-select p-2"
              selectedClassName="bg-blue-300 text-black rounded-md p-2">
              Password
            </Tab>

            <div
              className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 no-select p-2"
              // selectedClassName="bg-blue-300 text-black rounded-md p-2"
              onClick={() => {
                prepareNewEmp();
                document.getElementById('AddNewEmployeeModal').showModal()
              }}
              role="button"
              tabIndex="0"
            >
              Create Employee
            </div>

            <div className='ml-auto pr-6'>
              <button
                type="button"
                className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600"
                onClick={() => {
                  updateEmployee()
                }}
              >
                <span className='text-black text-2xl'><FaCloudUploadAlt /></span> Upload Changes
              </button>
            </div>

          </TabList>

          <TabPanel>
            <HomeEmploy />
          </TabPanel>

          <TabPanel>
            <Empcontact />
          </TabPanel>

          <TabPanel>
            <Empaddress />
          </TabPanel>

          <TabPanel>
            <Emppass />
          </TabPanel>

        </Tabs>
        <CreateNewEmployee />
        {showPopupMsg &&
          <PopupMsg message={popupContent} />
        }
      </div>
  )
}