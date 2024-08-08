import { useEffect, useState } from "react";
import Input from "../../styled/inputs";
import { CgMore, CgSearch } from "react-icons/cg";
import Error from "../Error";

export default function Transactions() {

  const [data, setData] = useState({
    dgNum: '',
    dgCode: '',
    dgAmount: 0,
    dgReplace: false,

  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));

  };

  const [transactioBatches, settransactioBatches] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);

    const existingItem = transactioBatches.find(item => item.dgNum === data.dgNum && item.dgCode === data.dgCode);
    if (existingItem) {

      if (data.dgReplace) {

        if (existingItem.dgAmount != data.dgAmount) {
          settransactioBatches(prevBatches =>
            prevBatches.map(item =>
              item.dgNum === data.dgNum && item.dgCode === data.dgCode
                ? {
                  ...item,
                  dgAmount: parseFloat(item.dgAmount) + parseFloat(data.dgAmount),
                  dgReplace: data.dgReplace
                }
                : item
            )
          );
        } else {
          setErrorMessage("Record already replaced!.")
          setShowError(() => (true))

        }
      } else {
        setErrorMessage("Cannot duplicate records. Try replacing.")
        setShowError(() => (true))
      }

    } else {
      settransactioBatches(prevBatches => [...prevBatches, data]);
    }
    console.log(transactioBatches);
    // Document.getElementById("transactionsModal").close()
  };

  const [searchList, setsetsearchList] = useState([])
  const [selectedSearchRow, setSelectedSearchRow] = useState(null);

  const [codeMore, setCodeMore] = useState([])
  const [selectedCodeRow, setselectedCodeRow] = useState(null);


  useEffect(() => {
    fetch('/data/cp-employee.json')
      .then(response => response.json())
      .then(data => setsetsearchList(data));
  }, [])

  useEffect(() => {
    fetch('/data/cp-parm-codes.json')
      .then(response => response.json())
      .then(data => setCodeMore(data));
  }, [])

  const [showError, setShowError] = useState(false)
  const [errorMesage, setErrorMessage] = useState("")

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

  return (
    <>
      <div className="overflow-x-auto m-0 p-0">
        <div className="flex flex-col h-[28rem] overflow-y-auto overflow-x-auto bg-slate-200 p-5 m-8 rounded-lg">
          <table className="table overflow-y-auto">
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
              {
                transactioBatches.map((item, index) => (
                  <tr className="hover no-select " key={index}>
                    <td>{index + 1}</td>
                    <td>{item.dgNum}</td>
                    <th>{item.dgCode}</th>
                    <td>{item.dgAmount}</td>
                    <td>{item.dgReplace ? "True" : "False"}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>

        <button
          type="submit"
          className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-8"
          onClick={() => document.getElementById('transactionModal').showModal()}
        >
          Add Amount
        </button>


        <button
          type="submit"
          className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600 m-4 ml-8"
        >
          Submit Transaction Batches
        </button>
      </div>

      {/* the dialogue thats only called after pressing add amount */}
      <dialog id="transactionModal" className="modal flex-auto">
        <div className=" bg-slate-200 p-16 rounded-xl">
          <div className="inline-flex">
            <h1 className="text-3xl text-center mb-5 font-bold mr-6">Transaction Batch Maintance</h1>
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
                        onIconClick={() => document.getElementById('selectEmpModal').showModal()} />

                    </div>
                    <div className="md:flex w-full gap-10">
                      <Input
                        title="Enter Code"
                        value={data.dgCode}
                        type="number"
                        inputId="dgCode"
                        name="dgCode"
                        placeholder="Enter Code"
                        onChange={handleChange}
                        Icon={CgMore}
                        onIconClick={() => document.getElementById('moreDropdownModal').showModal()} />
                    </div>
                    <div className="md:flex w-full gap-10">
                      <Input
                        title="Amount"
                        value={data.dgAmount}
                        type="number"
                        inputId="dgAmount"
                        name="dgAmount"
                        step="0.01"
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

            {/* Error inoformation popup. */}
            {showError &&
              <div className="pb-6 pt-3">
                <Error message={errorMesage} />
              </div>
            }
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
      <dialog id="selectEmpModal" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold ">Select an employee </h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
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
                  <tr className="hover no-select" key={item.EmpNo} onClick={() => {
                    setSelectedSearchRow(item);
                    setData(prevData => ({ ...prevData, dgNum: item.EmpNo }));
                    document.getElementById('selectEmpModal').close()
                  }}>
                    <th>{item.EmpNo}</th>
                    <td>{item.Inits}</td>
                    <td>{item.Surname}</td>
                    <td>{item.GivenNames}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>

      {/* the table thats only called when you press the more on enter code input */}


      <dialog id="moreDropdownModal" className="modal flex-auto">
        <div className=" bg-slate-200 pb-16 pt-10 px-16 rounded-xl">
          <div className="inline-flex justify-between w-full ">
            <h1 className="text-3xl text-center mb-5 font-bold mr-5 ">Select codename </h1>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost mb-5">✕</button>
            </form>
          </div>
          <div className="max-h-[25rem] overflow-y-auto">
            <table className="table ">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Codename</th>
                </tr>
              </thead>
              <tbody>
                {codeMore.map((item) => (
                  <tr className="hover no-select" key={item.OrdinalNo} onClick={() => {
                    setselectedCodeRow(item)
                    setData(prevData => ({ ...prevData, dgCode: item.OrdinalNo }));
                    document.getElementById('moreDropdownModal').close()
                  }}>
                    <th>{item.OrdinalNo}</th>
                    <td>{item.CodeName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>


    </>
  )
}

