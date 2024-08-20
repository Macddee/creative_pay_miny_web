import { useDataContexts } from "../../../ContextProviders/DataContexts";
import Input from "../../../styled/inputs"

export default function Password() {
  const  {employee, setEmployee} = useDataContexts()
  const {setAllEmployees} = useDataContexts()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee((employee) => ({
      ...employee,
      [name]: value,
    }));
  };

  function updateEmployee(updatedEmployee) {
    setAllEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee.EmpNo === updatedEmployee.EmpNo ? updatedEmployee : employee
      )
    );
  }

 
const handleSubmit = ((e) => {
  e.preventDefault();
  updateEmployee(employee)
  console.log(employee);
  
})

  return (
    <div>
      <div className="bg-blue-100 max-w-[1300px] p-5 md:p-15 py-10 rounded-lg w-[95%] relative block mt-1 m-auto">
        {/* <h1 className="text-3xl text-center font-bold">Update Employeee Details</h1> */}
        <form onSubmit={handleSubmit} >
          <div className="md:flex gap-20 flex-wrap">
            <div className="flex-1">
              <div className="flex flex-col">
                <div className="md:flex w-full gap-10">
                  <Input
                    title="Password"
                    value={employee.Password}
                    type="password"
                    inputId="Password"
                    name="Password"
                    placeholder="*********"
                    onChange={handleChange} />
                </div>
              </div>

            </div>
          </div>
          <button
            type="submit"
            className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-1"
            onClick={() => console.log("pressed")}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
