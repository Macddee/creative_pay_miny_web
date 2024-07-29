
import { NavLink, Outlet } from 'react-router-dom';
import React from 'react';
import { Sidebar } from 'flowbite-react';
import { FaBuildingUser } from 'react-icons/fa6';
import { LuFileTerminal } from 'react-icons/lu';
import { CgAlbum } from "react-icons/cg";
import { HiHome } from 'react-icons/hi';
import { BiSolidInstitution } from "react-icons/bi";
import { VscReferences } from "react-icons/vsc";
import { IoInformationCircle } from "react-icons/io5";
import { BsBank } from "react-icons/bs";
import { BsCalendarDate } from "react-icons/bs";
import { RiMoneyDollarBoxFill } from "react-icons/ri";


export default function Employees() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <section className="md:flex bg-slate-100 p-0 m-0">
        <div>
          <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            onClick={toggleSidebar}
            className="inline-flex items-center p-2  text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>

          <Sidebar
            aria-label="Sidebar with logo branding example"
            className={`bg-slate-100 fixed top-0 left-0 z-40 w-64 h-screen transition-transform${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 md:relative bg-sidebar`}
          >
            {/* <Sidebar.Logo
              href="#"
              img=""
              imgAlt=""
              className="flex items-center justify-center"
            >
              <img src="/logo.png" className="mt-0 block" alt="" />
            </Sidebar.Logo> */}
            
            <Sidebar.Items className='pb-5 h-full'>
              <Sidebar.ItemGroup className='m-0 pb-8 pt-7 pl-3 font-bold bg-slate-100 h-full '>

                <NavLink
                  to="/employees"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center gap-1 pb-3 text-black ml-1"
                >
                  <HiHome className="w-6 h-6 text-blue-300 transition duration-75  text-grape" />
                  <span className="ml-3">Home</span>
                </NavLink>
                <NavLink
                  to="/employees/company"
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) => {
                    return isActive
                      ? " bg-gray-500 text-white flex items-center p-2 text-base font-normal  rounded-lg hover:bg-gray-500 hover:text-black transition  group"
                      : "text-gray-800 flex items-center p-2 text-base font-normal  rounded-lg hover:bg-gray hover:text-[#000000] transition  group";
                  }}
                >
                  <BiSolidInstitution className="w-6 h-6 text-blue-400 transition duration-75 text-grape " />
                  <span className={` ml-3`}>Company</span>
                </NavLink>

                <NavLink
                  to="/employees/tax-information"
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) => {
                    return isActive
                      ? " bg-gray-500 text-white flex items-center p-2 text-base font-normal  rounded-lg hover:bg-gray-500 hover:text-black transition  group"
                      : "text-gray-800 flex items-center p-2 text-base font-normal  rounded-lg hover:bg-gray hover:text-[#000000] transition  group";
                  }}
                >
                  <IoInformationCircle className="w-6 h-6 text-blue-400 transition duration-75  text-grape" />
                  <span className="ml-3">Tax Information</span>
                </NavLink>

                <NavLink
                  to="/employees/banking"
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) => {
                    return isActive
                      ? " bg-gray-500 text-white flex items-center p-2 text-base font-normal  rounded-lg hover:bg-gray-500 hover:text-black transition  group"
                      : "text-gray-800 flex items-center p-2 text-base font-normal  rounded-lg hover:bg-gray hover:text-[#000000] transition  group";
                  }}
                >
                  <BsBank className="w-6 h-6 text-blue-400 transition duration-75  text-grape" />
                  <span className="ml-3">Banking</span>
                </NavLink>

                <NavLink
                  to="/employees/indicators"
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) => {
                    return isActive
                      ? " bg-gray-500 text-white flex items-center p-2 text-base font-normal  rounded-lg hover:bg-gray-500 hover:text-black transition  group"
                      : "text-gray-800 flex items-center p-2 text-base font-normal  rounded-lg hover:bg-gray hover:text-[#000000] transition  group";
                  }}
                >
                  <CgAlbum className="w-6 h-6 text-blue-300 transition duration-75  text-grape" />
                  <span className="ml-3">Indicators</span>
                </NavLink>

                <NavLink
                  to="/employees/references"
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) => {
                    return isActive
                      ? "bg-gray-500 text-white flex items-center p-2 text-base font-normal  rounded-lg hover:bg-gray-500 hover:text-black transition group"
                      : "text-gray-800 flex items-center p-2 text-base font-normal  rounded-lg hover:bg-gray hover:text-[#000000] transition  group";
                  }}
                >
                  <VscReferences className="w-6 h-6 text-blue-400 transition duration-75  text-grape" />
                  <span className="ml-3">References</span>
                </NavLink>

                <NavLink
                  to="/employees/dates"
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) => {
                    return isActive
                      ? " bg-gray-500 text-white flex items-center p-2 text-base font-normal  rounded-lg hover:bg-gray-500 hover:text-black transition  group"
                      : "text-gray-800 flex items-center p-2 text-base font-normal  rounded-lg hover:bg-gray hover:text-[#000000] transition  group";
                  }}
                >
                  <BsCalendarDate className="w-6 h-6 text-blue-400 transition duration-75  text-grape" />
                  <span className="ml-3">Dates</span>
                </NavLink>

                <NavLink
                  to="/employees/amounts"
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) => {
                    return isActive
                      ? " bg-gray-500 text-white flex items-center p-2 text-base font-normal  rounded-lg hover:bg-gray-500 hover:text-black transition  group"
                      : "text-gray-800 flex items-center p-2 text-base font-normal  rounded-lg hover:bg-gray hover:text-[#000000] transition  group";
                  }}
                >
                  <RiMoneyDollarBoxFill className="w-6 h-6 text-blue-400 transition duration-75  text-grape" />
                  <span className="ml-3">Amounts</span>
                </NavLink>

              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>
        <div
          className={
            isSidebarOpen
              ? " flex-1 background-space"
              : "flex-1 bg-[#F9FAFB] transition"
          }
          onClick={() => setIsSidebarOpen(false)}
        >
          {/* <div className="absolute right-0 w-['max-content'] md:relative p-5 px-10 md:shadow top-0 md:left-0 md:w-full bg-white">
            <h3 className="text-black text-xl lg:text-4xl">Manage Employees</h3>
          </div> */}
          <Outlet />
        </div>
      </section>
    </>
  );
}
