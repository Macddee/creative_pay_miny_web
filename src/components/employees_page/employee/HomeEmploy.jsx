import Input from "../../../styled/inputs"
import { CgSearch } from "react-icons/cg";
import { useDataContexts } from "../../../ContextProviders/DataContexts";
import SearchPopup from "../../SearchPopup";
import { convertFromJulianToDateTime, convertFromDateTimeToJulian } from "../../logic/EmployeeLogic";
import Findemployee from "../../Findemployee";

export default function HomeEmploy() {

  const {
    employee, setEmployee,
    employeeDetails, setemployeeDetails,
  } = useDataContexts()

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newVal = value;

    if (name.includes("Date")) {
      newVal = convertFromDateTimeToJulian(value);
      console.log(newVal);
    }
    
    setEmployee((employee) => ({
      ...employee,
      [name]: newVal,
    }));
  };

  const handleIdChange = (e) => {
    const { name, value } = e.target;
    setemployeeDetails({
      ...employeeDetails,
      [name]: value
    })
  }

  return (
    <>
      <div className="bg-blue-100 p-5 py-10 rounded-lg relative block mt-1 ml-8 mr-8 flex-grow ">
        {/* <h1 className="text-3xl text-center font-bold">Update Employeee Details</h1> */}
        <form >
          <div className="md:flex gap-20 flex-wrap">
            <div className="flex-1">
              <div className="flex flex-col">
                <div className="md:flex w-full gap-10">
                  <Input
                    title="Employee Number"
                    value={employee.EmpNo || ""}
                    type="text"
                    inputId="dgNum"
                    name="EmpNo"
                    placeholder="Employee number"
                    onChange={handleChange}
                    Icon={CgSearch}
                    onIconClick={() => document.getElementById('selectEmpModal').showModal()} />
                  <Input
                    title="Title"
                    value={employee.Title || ""}
                    type="text"
                    inputId="Title"
                    name="Title"
                    placeholder="Title"
                    onChange={handleChange} />
                </div>
                <div className="md:flex w-full gap-10">
                  <Input
                    title="Surname"
                    value={employee.Surname || ""}
                    type="text"
                    inputId="surname"
                    name="Surname"
                    placeholder="Surname"
                    onChange={handleChange} />
                  <Input
                    title="Spouse Name"
                    value={employee.HusbNames || ""}
                    type="text"
                    inputId="spouse"
                    name="HusbNames"
                    placeholder="Spouse"
                    onChange={handleChange} />
                </div>
                <div className="md:flex w-full gap-10">
                  <Input
                    title="Names"
                    value={employee.GivenNames || ""}
                    type="text"
                    inputId="names"
                    name="GivenNames"
                    placeholder="Names"
                    onChange={handleChange} />
                  <Input
                    title="Passport Number"
                    value={employeeDetails.PassportCountry || ""}
                    type="text"
                    inputId="PassportCountry"
                    name="PassportCountry"
                    placeholder="XX-XXXXXXX Y XX"
                    onChange={handleIdChange} />
                </div>

                <div className="md:flex w-full gap-10">
                  <Input
                    title="Birth Date"
                    value={convertFromJulianToDateTime(employee.BirthDate) || ""}
                    type="date"
                    inputId="bdate"
                    name="BirthDate"
                    placeholder="Birthday"
                    onChange={handleChange} />
                  <Input
                    title="Contract End Date"
                    value={convertFromJulianToDateTime(employee.DischDate)|| ""}
                    type="date"
                    inputId="DischDate"
                    name="DischDate"
                    placeholder="Contract end date"
                    onChange={handleChange} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ flex: '0 0 48%' }}>
                    <Input
                      title="Initials"
                      value={employee.Inits || ""}
                      type="text"
                      inputId="initials"
                      name="Inits"
                      placeholder="initials"
                      onChange={handleChange} />
                  </div>
                </div>
              </div>



            </div>
          </div>
          <div className="flex ">
            {/* <Findemployee /> */}
          </div>
        </form>
      </div>


      {/* the table thats only called when you press the search icon */}
      <SearchPopup />
    </>
  );
}