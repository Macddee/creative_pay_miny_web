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

  return (
    <div>
      <div className="bg-blue-100 max-w-[1300px] p-5 md:p-15 py-10 rounded-lg w-[95%] relative block mt-1 m-auto">
        {/* <h1 className="text-3xl text-center font-bold">Update Employeee Details</h1> */}
        <form >
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
        </form>
      </div>
    </div>
  )
}
