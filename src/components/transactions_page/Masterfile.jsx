import { useEffect, useState } from "react";
import Input from "../../styled/inputs";
import { CgMore, CgSearch } from "react-icons/cg";

export default function Masterfile() {

  const [data, setData] = useState({
    dgNum: '',
    dgCode: '',
    dgAmount: '',
    dgReplace: false,
    dgCNum: '',
    dgCodename: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    closeFormModal();
  };

  const [searchList, setsetsearchList] = useState([])
  const [selectedSearchRow, setSelectedSearchRow] = useState(null);

  const [codeMore, setCodeMore] = useState([])
  const [selectedCodeRow, setselectedCodeRow] = useState(null);


  useEffect(() => {
    setsetsearchList([
      { id: 1, initials: "K", surname: 'Cy Ganderton', name: 'Blue', },
      { id: 2, initials: "K", surname: 'Hart Hagerty', name: 'Purple', },
      { id: 3, initials: "K", surname: 'Brice Swyre', name: 'Red' },
    ])
  }, [])

  useEffect(() => {
    setCodeMore([
      { id: 1, name: 'Blue', },
      { id: 2, name: 'Purple', },
      { id: 3, name: 'Red' },
    ])
  }, [])


  return (
    <>
      <div className="overflow-x-auto  p-4">
        <div className="overflow-x-auto bg-slate-200 p-10 m-8 rounded-lg">
          <table className="table ">
            <thead>
              <tr>
                <th>#</th>
                <th>Employee Number</th>
                <th>Code Number</th>
                <th>Amount</th>
                <th>Replace</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="hover">
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr className="hover">
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr className="hover">
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
                <td>Red</td>

              </tr>
            </tbody>
          </table>

        </div>

        <button
          type="submit"
          className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-8"
          onClick={() => document.getElementById('masterfileModal').showModal()}
        >
          Add Amount
        </button>


        <button
          type="submit"
          className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-8"
        >
          Submit Masterfile Batches
        </button>
      </div>

      {/* the dialogue thats only called after pressing add amount */}
      <dialog id="masterfileModal" className="modal flex-auto">
        <div className=" bg-slate-200 p-16 rounded-xl">
          <div className="inline-flex">
            <h1 className="text-3xl text-center mb-5 font-bold mr-6">Masterfile Batch Maintance</h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost  mb-5">✕</button>
            </form>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="md:flex gap-20 flex-wrap">
              <div className="flex-1">
                <div className="mt-10">
                  <div className="flex flex-col">
                    <div className="md:flex w-full gap-10">
                      <Input
                        title="Employee Number"
                        value={data.dgNum}
                        type="text"
                        inputId="dgNum"
                        name="dgNum"
                        placeholder="Employee number"
                        onChange={handleChange}
                        Icon={CgSearch}
                        onIconClick={() => document.getElementById('selectEmpModalMaster').showModal()} />

                    </div>
                    <div className="md:flex w-full gap-10">
                      <Input
                        title="Enter Code"
                        value={data.dgCode}
                        type="text"
                        inputId="dgCode"
                        name="dgCode"
                        placeholder="Enter Code"
                        onChange={handleChange}
                        Icon={CgMore}
                        onIconClick={() => document.getElementById('moreDropdownModalMaster').showModal()} />
                    </div>
                    <div className="md:flex w-full gap-10">
                      <Input
                        title="Amount"
                        value={data.dgAmount}
                        type="currency"
                        inputId="dgAmount"
                        name="dgAmount"
                        placeholder="Enter Employee Amount"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-control mx-auto py-3">
                      <label className="label cursor-pointer">
                        <input
                          type="checkbox"
                          name="dgReplace"
                          checked={data.dgReplace}
                          onChange={e => setData({ ...data, dgReplace: e.target.checked })}
                          className="checkbox checkbox-primary mr-4"
                        />
                        <span className="label-text gap-">Replace</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className=" w-full mx-auto btn bg-blue-400 hover:bg-blue-200 outline-blue-600 text-black border-blue-600"
            >
              Save
            </button>
          </form>
        </div>
      </dialog>


      {/* the table thats only called when you press the search icon */}
      <dialog id="selectEmpModalMaster" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold ">Select an employee </h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <table className="table ">
            <thead>
              <tr>
                <th>EmpNo</th>
                <th>Initials</th>
                <th>Surname</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {searchList.map((item) => (
                <tr className="hover" key={item.id} onClick={() => {
                  setSelectedSearchRow(item);
                  setData(prevData => ({ ...prevData, dgNum: item.id }));
                  document.getElementById('selectEmpModalMaster').close()
                }}>
                  <th>{item.id}</th>
                  <td>{item.initials}</td>
                  <td>{item.surname}</td>
                  <td>{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </dialog>

      {/* the table thats only called when you press the more on enter code input */}

      
        <dialog id="moreDropdownModalMaster" className="modal flex-auto">
          <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
            <div className="inline-flex justify-between w-full ">
              <h1 className="text-3xl text-center mb-5 font-bold mr-5 ">Select codename </h1>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
              </form>
            </div>
            <table className="table ">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Codename</th>
                </tr>
              </thead>
              <tbody>
                {searchList.map((item) => (
                  <tr className="hover" key={item.id} onClick={() => {
                    setselectedCodeRow(item)
                    setData(prevData => ({ ...prevData, dgCode: item.id }));
                    document.getElementById('moreDropdownModalMaster').close()
                  }}>
                    <th>{item.id}</th>
                    <td>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </dialog>
    

    </>
  )
}

