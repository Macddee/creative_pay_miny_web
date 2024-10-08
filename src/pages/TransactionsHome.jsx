
import { NavLink, Outlet } from 'react-router-dom';
import React from 'react';
import { Sidebar } from 'flowbite-react';

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
      <section className="sticky md:flex bg-white p-0 m-0 flex-grow">
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
            className={`sticky top-0 left-0 z-40 w-64 transition-transform${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } md:translate-x-0 md:relative bg-sidebar`}
          >

            <Sidebar.Items className='pb-5 h-full gap-y-5 mb-10 bg-white hover:text-blue-600'>
              <Sidebar.ItemGroup className='m-0 pb-8 pt-7 pl-3 space-y-8 hover:text-blue-600'>

                <NavLink
                end
                  to={{
                    pathname: "/transactions",
                  }}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) => {
                    return isActive
                    ? "bg-blue-200 text-black flex items-center p-3 text-base font-bold rounded-lg  transition group"
                    : "text-gray-800 flex items-center p-2 text-base font-normal hover:text-blue-600 hover:bg-blue-200 hover:p-3 hover:rounded-lg transition group";
                }}                >
                  <HiHome className="w-6 h-6 text-blue-300 transition duration-75  text-grape " />
                  <span className="ml-3 ">Transactions</span>
                </NavLink>

                <NavLink
                  to="/transactions/view-batches"
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) => {
                    return isActive
                    ? "bg-blue-200 text-black flex items-center p-3 text-base font-bold rounded-lg  transition group"
                    : "text-gray-800 flex items-center p-2 text-base font-normal hover:text-blue-600 hover:bg-blue-200 hover:p-3 hover:rounded-lg transition group";
                }}
                >
                  <BiSolidInstitution className="w-6 h-6 text-blue-400 transition duration-75 text-grape " />
                  <span className={` ml-3`}>View Batches</span>
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
          <Outlet />
        </div>
      </section>
    </>
  );
}
