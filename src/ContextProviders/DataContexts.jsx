// CombinedContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '../auth/auth';

const DataContexts = createContext();
console.log("why are we in data contexts");


export function DataProvider({ children }) {


  const [showError, setShowError] = useState(false)
  const [showPopupMsg, setShowPopupMsg] = useState(false)
  const [popupContent, setPopupContent] = useState("Employee Details Successifuly Updated.")
  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState([]);
  // const [savedTransactions, setSavedTransactions] = useState([]);
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
  const [allEmployeeDetails, setAllEmployeeDetails] = useState([])
  const [employeeDetails, setemployeeDetails] = useState({
    
  })
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
    Amt: 0,
    CodeName: "",
    EmpNames:"",
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
    EmpNo: 0,
    OrdinalNo: 1,
    PayMode: "",
    SARSBankAccount: "",
    SourceBankAccountNumber: "",
    SplitPayCode: 0,

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

  const { waitForToken, } = useAuth()  

  const postUrl = "https://payroll-dinson-backend.creativehr.co.zw/api/edit-masterfile"
  const getUrl = "https://payroll-dinson-backend.creativehr.co.zw/api/get-masterfile"

  const [token, setToken] = useState("")

  const [selectePayroll, setSelectePayroll] = useState("")

  const putRequest = (table, data) => {
    setIsLoading(true)
    fetch(postUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },

      body: JSON.stringify({ table: [data] })
    })
      .then(response => response.json())
      .then(data => {
        setShowPopupMsg(true);
        setPopupContent(data.message);
        setIsLoading(false);

      })
      .catch(error => {
        setShowPopupMsg(true);
        setPopupContent(error.message);
        setIsLoading(false);
      });

  }

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    setToken(storedToken)
  }, [waitForToken])

  useEffect(() => {
    const storedPayroll = sessionStorage.getItem('selectedPayroll');
    if (storedPayroll) {
      setSelectePayroll(storedPayroll);
    }
  }, []); // This useEffect runs only once when the component mounts
  
  useEffect(() => {
    if (!selectePayroll && !token) return;
    console.log(selectePayroll)
    console.log(token)
    const fetchData = async () => {
      
      setIsLoading(true); // Set loading to true before starting the fetch request
      try {
        const response = await fetch(getUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ payroll: selectePayroll })
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.message}`);
        }
        setPopupContent("Payroll Information Successifuly Fetched!.");
        setShowPopupMsg(true);
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
        setDates(data.cp_dates_data);
        setDatesData(data.cp_dates);
        setAmounts(data.cp_amounts);
        setTransactions(data.cp_batch_inputs);
      } catch (error) {
        if (error.message === 'Failed to fetch') {
          setPopupContent('Network error: Please check your internet connection.');
        } else {
          setPopupContent('Error:', error);
        }
        setShowPopupMsg(true);

      } finally {
        setIsLoading(false); // Set loading to false after the request completes
      }
    };

    fetchData();
  }, [selectePayroll, token])


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


  useEffect(() => {
    let timer;
    if (showPopupMsg) {
      timer = setTimeout(() => {
        setShowPopupMsg(false);
      }, 7000); // hides the popup message after 10 seconds
    }

    const handleClick = () => {
      setShowPopupMsg(false);
    };

    // Add event listener when showPopupMsg is true
    if (showPopupMsg) {
      document.addEventListener('click', handleClick);
    }

    // Remove event listener when showPopupMsg is false and cleanup on unmount
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClick);
    };
  }, [showPopupMsg]);

  return (
    <DataContexts.Provider value={{
      showError, setShowError,
      transactions, setTransactions,
      // savedTransactions, setSavedTransactions,
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
      showPopupMsg, setShowPopupMsg,
      popupContent, setPopupContent,
      putRequest,
      selectePayroll, setSelectePayroll,

    }}>
      {children}
    </DataContexts.Provider>
  );
}

export function useDataContexts() {
  return useContext(DataContexts);
}