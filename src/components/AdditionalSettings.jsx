import React from 'react';
import { IoPersonAddSharp } from 'react-icons/io5';
import { MdOutlineRestorePage } from 'react-icons/md';
import { RiIndeterminateCircleLine } from 'react-icons/ri';
import { CreateNewEmployee, TerminateEmployee } from './SearchPopup';
import { useDataContexts } from '../ContextProviders/DataContexts';

export default function AdditionalSettings() {

  const {
    setEmployee,
    setemployeeDetails,
    showSideBar, setShowSideBar
  } = useDataContexts();

  const prepareNewEmp = () => {

    setEmployee(
      {
        Addr1: "",
        Addr2: "",
        Addr3: "",
        Addr4: "",
        BirthDate: 0,
        ClockNo: "",
        CostCodes: "",
        DirAmt: "",
        DirPercent: "",
        DischDate: 0,
        DischRsn: "",
        DischThisPeriodInd: "",
        Email: "",
        EmpNo: null,
        EngageDate: 0,
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
        StopFrom: 0,
        StopTo: 0,
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
    setemployeeDetails({
      Bu1_Unit: "",
      Bu2_Complex: "",
      Bu3_StreetNo: "",
      Bu4_StreetName: "",
      Bu5_Suburb: "",
      Bu6_Town: "",
      Bu7_PostCode: "",
      Bu8_CountryCode: "",
      CountryCode: "",
      EmailAddress: "",
      EmailPDF: "",
      EmpNo: null,
      PassportCountry: "",
      PhoneBusiness: "",
      PhoneCell: "",
      PhoneFax: "",
      PhoneHome: "",
      Po_AddrType: "0",
      Po_CareOfName: "",
      Po_COAddr: "",
      Po1_Unit: "",
      Po10_POBranch: "",
      Po11_PostCode: "",
      Po12_CountryCode: "null",
      Po2_Complex: "",
      Po3_StreetNo: "",
      Po4_StreetName: "",
      Po5_Suburb: "",
      Po6_Town: "",
      Po7_BoxBagNo: "",
      Po8_AgencySubUnit: "",
      Po9_SpecialService: "",
      Post_Line1: "",
      Post_Line2: "",
      Post_Line3: "",
      Post_Line4: "",
      PostCode: "",
      Re1_Unit: "",
      Re2_Complex: "",
      Re3_StreetNo: "",
      Re4_StreetName: "",
      Re5_Suburb: "",
      Re6_Town: "",
      Re7_PostCode: "",
      ResAsPostal: "",
    });
  }


  return (
    <div className="drawer drawer-end fixed inset-0 z-50">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        {/* <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Open drawer</label> */}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="bg-base-200 min-h-full w-80 p-8">
          <div
            role="button"
            onClick={() => {
              prepareNewEmp();
              document.getElementById('AddNewEmployeeModal').showModal();
            }}
            className='sidebar-item pb-3 text-gray-800 flex items-center text-base font-normal hover:text-blue-600 hover:bg-blue-200 hover: p-3 hover:rounded-lg transition group'>
            <IoPersonAddSharp className="w-6 h-6 text-blue-400 transition duration-75 text-grape" />
            <span className='ml-2'>Create Employee</span>
          </div>

          <div
            role="button"
            onClick={() => {
              prepareNewEmp();
              document.getElementById('TerminateEmployeeModal').showModal();
            }}
            className='sidebar-item pb-3 text-gray-800 flex items-center text-base font-normal hover:text-blue-600 hover:bg-blue-200 hover: p-3 hover:rounded-lg transition group'>
            <a className='flex items-center'>
              <RiIndeterminateCircleLine className="w-6 h-6 text-blue-400 transition duration-75 text-grape" />
              <span className='ml-2'>Terminate Employee</span>
            </a>
          </div>

          <div
            role="button"
            onClick={() => {
              prepareNewEmp();
              document.getElementById('AddNewEmployeeModal').showModal();
            }}
            className='sidebar-item pb-3 text-gray-800 flex items-center text-base font-normal hover:text-blue-600 hover:bg-blue-200 hover: p-3 hover:rounded-lg transition group'>
            <a className='flex items-center'>
              <MdOutlineRestorePage className="w-6 h-6 text-blue-400 transition duration-75 text-grape" />
              <span className='ml-2'>Reinstate Employee</span>
            </a>
          </div>

        </div>
      </div>
      <CreateNewEmployee />
      <TerminateEmployee />
    </div>
  );
}