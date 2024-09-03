import Input from "../../../styled/inputs"
import { useDataContexts } from "../../../ContextProviders/DataContexts";
import { convertFromDateTimeToJulian } from "../../logic/EmployeeLogic";

export default function Empstoppay() {
  const {
    setShowPopupMsg,
    setAllEmployees,
    setPopupContent,
    employee, setEmployee } = useDataContexts()


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

  function updateEmployeeDetails(updatedEmployee) {
    setAllEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee.EmpNo === updatedEmployee.EmpNo ? updatedEmployee : employee
      )
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateEmployeeDetails(employee)
    // setPopupContent("Maste")
    setShowPopupMsg(true);
  }
  return (
    <>
      <div className="bg-blue-100 max-w-[1300px] p-5 md:p-15 py-10 rounded-lg w-[95%] relative block mt-1 m-auto">
        {/* <h1 className="text-3xl text-center font-bold">Update Employeee Details</h1> */}
        <form onSubmit={handleSubmit} >
          <div className="md:flex gap-20 flex-wrap">
            <div className="flex-1">
              <div className="flex flex-col">
                <div className="md:flex w-full gap-10">
                  <Input
                    title="Stop From"
                    value={employee.StopFrom || ""}
                    type="date"
                    inputId="StopFrom"
                    name="StopFrom"
                    placeholder="XX/XX/20XX"
                    onChange={handleChange} />
                  <Input
                    title="Stop To"
                    value={employee.StopTo || ""}
                    type="date"
                    inputId="StopTo"
                    name="StopTo"
                    placeholder="XX/XX/20XX"
                    onChange={handleChange} />
                </div>
              </div>

            </div>
          </div>
          <button
            type="submit"
            className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600"
          >
            Save
          </button>
        </form>
      </div></>
  );
}