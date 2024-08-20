// CombinedContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '../auth/auth';

const DataContexts = createContext();

export function DataProvider({ children }) {

  const [showError, setShowError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState([]);
  const [savedTransactions, setSavedTransactions] = useState([]);
  const [inputedTransactions, setInputedTransactions] = useState({
    EmpNo: "",
    OrdinalNo: "",
    Amt: "",
    toReplace: false,
    batchNo: "",
    costCodes: "",
    time: "",
    CodeName: "",
    BreakDesc: "",
  });
  const [parmCodes, setParmCodes] = useState([])
  const [costCodes, setCostCodes] = useState([])
  const [occupationCodes, setOccupationCodes] = useState([])
  const [payPoint, setPayPoint] = useState([])
  const [employeeDetails, setemployeeDetails] = useState({})
  const [allEmployeeDetails, setAllEmployeeDetails] = useState([])
  const [allBanksData, setAllBanksData] = useState([])
  const [employeesBankDetails, setEmployeesBankDetails] = useState([])

  const [primaryIndicators, setPrimaryIndicators] = useState([])
  const [selectedIndicators, setSelectedIndicators] = useState({
    IndicatorName: "",
    IndicatorValue: "",
  })
  const [allIndicators, setallIndicators] = useState([])
  const [employeesIndicators, setEmployeesIndicators] = useState([])
  const [inputedEmployeeIndicator, setInputedEmployeeIndicator] = useState({
    Ind: "",
    EmpNo: "",
    OrdinalNo: ""
  })
  const [references, setReferences] = useState([])
  const [referencesData, setReferencesData] = useState([])
  const [inputedRef, setInputedRef] = useState({
    RefNo: "",
    OrdinalNo: "",
    EmpNo: "",
    RefNoCode: "",
    RefNoName: "",
  })

  const [dates, setDates] = useState([])
  const [datesData, setDatesData] = useState([])
  const [inputedDate, setInputedDate] = useState({
    OrdinalNo: "",
    DateName: "",
    EmpNo: "",
    DateValue: ""
  })

  const [amounts, setAmounts] = useState([])
  const [inputedAmounts, setInputedAmounts] = useState({
    EmpNo: "",
    OrdinalNo: "",
    Amt: "",
    CodeName: ""
  })


  const [allEmployees, setAllEmployees] = useState([])
  const [employee, setEmployee] = useState(
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
    });

  const [inputedBankData, setInputedBankData] = useState({
    AccountHolderStatus: "",
    DestinAccountType: "",
    DestinBankAccountName: "",
    DestinBankAccountNumber: "",
    DestinBankSortCode: "",
    EmpNo: "",
    OrdinalNo: "",
    PayMode: "",
    SARSBankAccount: "",
    SourceBankAccountNumber: "",
    SplitPayCode: "",

    BranchName: "",
    Holder: "",
    Mode: "",
  })

  const accHolder = [
    { OrdinalNo: "1", holder: "Own" },
    { OrdinalNo: "2", holder: "Joint" },
    { OrdinalNo: "3", holder: "Third Party" },
  ]

  const payMode = [
    { symbol: "B", mode: "Bank Transfer" },
    { symbol: "C", mode: "Bank Cheque" },
    { symbol: "M", mode: "Manual" },
    { symbol: "P", mode: "Cash" },
    { symbol: "Q", mode: "Cheque" },
    { symbol: "T", mode: "Teba" },
  ]

  const { user } = useAuth()

  const postUrl = "https://payroll-dinson-backend.creativehr.co.zw/api/edit-masterfile"
  const getUrl = "https://payroll-dinson-backend.creativehr.co.zw/api/get-masterfile"
  // const token = user? user.token :null
  const token = "2|pga4xpni346iU62FjABlJUGwVZilviWUeO6oK9gR002e74b6"


  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true); // Set loading to true before starting the fetch request
      try {

        const response = await fetch(getUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setAllEmployees(data.cp_employee);
        setAllEmployeeDetails(data.cp_employee_details);
        setParmCodes(data.cp_parm_codes);
        setCostCodes(data.cp_cost_codes);
        setPayPoint(data.cp_paypoints);
        setOccupationCodes(data.cp_occupation_codes);
        setAllBanksData(data.cp_bank_data);
        setEmployeesBankDetails(data.cp_bank_details);
        setPrimaryIndicators(data.cp_indicators);
        setallIndicators(data.cp_indicators_subs);
        setEmployeesIndicators(data.cp_indicators_data);
        setReferencesData(data.cp_references);
        setReferences(data.cp_ref_values);
        setDates(data.cp_dates);
        setDatesData(data.cp_dates_data);
        setAmounts(data.cp_amounts);
        setTransactions(data.cp_batch_inputs);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false); // Set loading to false after the request completes
      }
    };


    fetchData();
    // console.log(isLoading);

    // fetch('/data/John.cp-employee.json')
    //   .then(response => response.json())
    //   .then(data => { setAllEmployees(data); })
    //   .catch(error => console.error("error", error));

    //   fetch('/data/John.cp-employee-details.json')
    //   .then(response => response.json())
    //   .then(data => { setAllEmployeeDetails(data); })
    //   .catch(error => console.error("error", error));

    // fetch('/data/John.cp-parm-codes.json')
    //   .then(response => response.json())
    //   .then(data => { setParmCodes(data); });

    // fetch('/data/John.cp-cost-code.json')
    //   .then(response => response.json())
    //   .then(data => { setCostCodes(data); });

    // fetch('/data/John.cp-paypont.json')
    //   .then(response => response.json())
    //   .then(data => { setPayPoint(data); });

    // fetch('/data/John.cp-occupationCodes.json')
    //   .then(response => response.json())
    //   .then(data => { setOccupationCodes(data); });

    // fetch('/data/John.cp-bank-data.json')
    //   .then(response => response.json())
    //   .then(data => { setAllBanksData(data); });

    // fetch('/data/John.cp-bank-details.json')
    //   .then(response => response.json())
    //   .then(data => { setEmployeesBankDetails(data); });

    // fetch('/data/John.cp-indicators.json')
    //   .then(response => response.json())
    //   .then(data => { setPrimaryIndicators(data); });

    // fetch('/data/John.cp-indicators-subs.json')
    //   .then(response => response.json())
    //   .then(data => { setallIndicators(data); });

    // fetch('/data/John.cp-indicators-data.json')
    //   .then(response => response.json())
    //   .then(data => { setEmployeesIndicators(data); });

    // fetch('/data/John.cp-refences.json')
    //   .then(response => response.json())
    //   .then(data => { setReferencesData(data); });

    // fetch('/data/John.cp-ref-values.json')
    //   .then(response => response.json())
    //   .then(data => { setReferences(data); });

    // fetch('/data/John.cp-dates-data.json')
    //   .then(response => response.json())
    //   .then(data => { setDates(data); });

    // fetch('/data/John.cp_dates.json')
    //   .then(response => response.json())
    //   .then(data => { setDatesData(data); });

    // fetch('/data/John.cp-amounts.json')
    //   .then(response => response.json())
    //   .then(data => { setAmounts(data); });

    // fetch('/data/John.cp-batch_inputs.json')
    //   .then(response => response.json())
    //   .then(data => { setTransactions(data); });

  }, [])


  useEffect(() => {
    let timer;
    if (showError) {
      timer = setTimeout(() => {
        setShowError(false);
      }, 10000); // hides the error after 10 seconds
    }

    const handleClick = () => {
      setShowError(false);
    };

    // Add event listener when showError is true
    if (showError) {
      document.addEventListener('click', handleClick);
    }

    // Remove event listener when showError is false and cleanup on unmount
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClick);
    };
  }, [showError]);

  // this is now being done in SearchPopup.jsx because thats the only way to put any particular employee in employee state
  //also give take the details of the selected employee and put them in their own varrr.
  // useEffect(() => {
  //   const employeeDetail = allEmployeeDetails.find(detail => detail.empNo === employee.EmpNo);
  //   setemployeeDetails(employeeDetail);
  //   console.log(employeeDetails)
  // }, [employee]); // This  effect runs whenever `employee` changes


  return (
    <DataContexts.Provider value={{
      showError, setShowError,
      transactions, setTransactions,
      savedTransactions, setSavedTransactions,
      employee, setEmployee,
      allEmployees, setAllEmployees,
      employeeDetails, setemployeeDetails,
      allEmployeeDetails, setAllEmployeeDetails,
      parmCodes, setParmCodes,
      costCodes, setCostCodes,
      payPoint, setPayPoint,
      inputedTransactions, setInputedTransactions,
      occupationCodes, setOccupationCodes,
      employeesBankDetails, setEmployeesBankDetails,
      allBanksData, setAllBanksData,
      payMode, accHolder,
      inputedBankData, setInputedBankData,
      allIndicators, setallIndicators,
      employeesIndicators, setEmployeesIndicators,
      inputedEmployeeIndicator, setInputedEmployeeIndicator,
      primaryIndicators, setPrimaryIndicators,
      selectedIndicators, setSelectedIndicators,
      referencesData, setReferencesData,
      references, setReferences,
      inputedRef, setInputedRef,
      dates, setDates,
      datesData, setDatesData,
      inputedDate, setInputedDate,
      amounts, setAmounts,
      inputedAmounts, setInputedAmounts,
      token, postUrl,
      isLoading, setIsLoading,
    }}>
      {children}
    </DataContexts.Provider>
  );
}

export function useDataContexts() {
  return useContext(DataContexts);
}