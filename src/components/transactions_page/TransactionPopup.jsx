import {React, useEffect} from 'react'
import { CgSearch } from 'react-icons/cg';
import { useState } from 'react';
import { Modal } from 'react-modal';
import Input from '../../styled/inputs';

export default function TransactionPopup() {
  const [data, setData] = useState({
    eventName: "",
    description: '',
    location: "",
    date: '',
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
    closeFormModal(); // Close the form modal when the form is submitted
  };

  useEffect(() => {
    const modal = document.getElementById('my_modal_3');
    if (modal) {
      modal.showModal();
    }
  }, []);

  return (
    <>
      {/* <div className="bg-blue-100 max-w-[1300px] p-5  md:p-15 py-10 rounded-lg w-[95%] relative block mt-10 m-auto "> */}
        {/* <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button> */}
        {document.getElementById('transactionModal').showModal()}
        <dialog id="transactionModal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h1 className="text-3xl text-center mb-5 font-bold">Company Details</h1>
            <form onSubmit={handleSubmit}>
              <div className="md:flex gap-20 flex-wrap">
                <div className="flex-1">
                  <div className="mt-10">
                    <div className="flex flex-col">
                      <div className="md:flex w-full gap-10">
                        <Input
                          title="Stop From"
                          value={data.comStop}
                          type="date"
                          inputId="comStop"
                          name="comStop"
                          placeholder="XX/XX/20XX"
                          onChange={handleChange} />
                      </div>
                      <div className="md:flex w-full gap-10">
                        <Input
                          title="Stop To"
                          value={data.comTo}
                          type="date"
                          inputId="comTo"
                          name="comTo"
                          placeholder="XX/XX/20XX"
                          onChange={handleChange} />
                      </div>
                      <div className="md:flex w-full gap-10">
                        <Input
                          title="Employee Number"
                          value={data.empNum}
                          type="text"
                          inputId="empNum"
                          name="empNum"
                          placeholder="Enter Employee Number"
                          onChange={handleChange}
                        // iconName={CgSearch}
                        // onIconClick={handleIconClick} 
                        />


                      </div>
                      <div className="md:flex w-full gap-10">
                        <Input
                          title="Stop To"
                          value={data.comTo}
                          type="date"
                          inputId="comTo"
                          name="comTo"
                          placeholder="XX/XX/20XX"
                          onChange={handleChange} />
                      </div>
                      <div className="md:flex w-full gap-10">
                        <Input
                          title="Stop To"
                          value={data.comTo}
                          type="date"
                          inputId="comTo"
                          name="comTo"
                          placeholder="XX/XX/20XX"
                          onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </dialog>

      {/* </div> */}

      {/* You can open the modal using document.getElementById('ID').showModal() method */}

    </>
  );
}
