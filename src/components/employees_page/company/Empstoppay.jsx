import Input from "../../../styled/inputs"
import { useDataContexts } from "../../../ContextProviders/DataContexts";
import { convertFromDateTimeToJulian, convertFromJulianToDateTime } from "../../logic/EmployeeLogic";

export default function Empstoppay() {
  const {
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

  return (
    <>
      <div className="bg-blue-100 max-w-[1300px] p-5 md:p-15 py-10 rounded-lg w-[95%] relative block mt-1 m-auto">
        {/* <h1 className="text-3xl text-center font-bold">Update Employeee Details</h1> */}
        <form >
          <div className="md:flex gap-20 flex-wrap">
            <div className="flex-1">
              <div className="flex flex-col">
                <div className="md:flex w-full gap-10">
                  <Input
                    title="Stop To Date"
                    value={convertFromJulianToDateTime(employee.StopTo)}
                    type="date"
                    inputId="EngageDate"
                    name="EngageDate"
                    placeholder="Stop To"
                    onChange={handleChange} />

                </div>
                  <Input
                    title="Engagement Date"
                    value={convertFromJulianToDateTime(employee.StopFrom)}
                    type="date"
                    inputId="EngageDate"
                    name="EngageDate"
                    placeholder="Engage Date"
                    onChange={handleChange} />
              </div>

            </div>
          </div>
        </form>
      </div></>
  );
}