import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Events() {
  return (
    <section className="p-[20px]">
      <div className="flex justify-between p-[30px]">
        <h1>heading with add button as an example</h1>
        <Link to="/employees/events/add" className="bg-blue-400 h-[50px] rounded-[10px] text-white font-bold w-max px-5 flex items-center justify-center ">Add Event</Link>
      </div>
      <div className="overflow-x-auto">
       
      </div>
    </section>
  );
}

