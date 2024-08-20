import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Empcontact from './Empcontact';
import Empaddress from './Empaddress';
import HomeEmploy from './HomeEmploy';
import Emppass from './Emppass';
import { useDataContexts } from '../../../ContextProviders/DataContexts';
import { Button } from 'flowbite-react';
import { CreateNewEmployee } from '../../SearchPopup';
import Loading from '../../Loading';


export default function EmpNav() {
  const { 
    employee,
    token, postUrl,
    isLoading,
   } = useDataContexts();

  const updateEmployee = () => {
    fetch(postUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      
      body: JSON.stringify({ "cp_employee": [employee] })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }
  console.log(isLoading);
  
  return (
    isLoading
    ? <Loading />
    : <div className="bg-slate-100 rounded h-full">
      <Tabs>
        <TabList className="flex justify-start list-none p-4 gap-6 bg-slate-100 pl-8">
          <Tab
            className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 no-select p-2"
            selectedClassName="bg-blue-300 text-black rounded-md p-2">
            Employee Details
          </Tab>

          <Tab
            className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 no-select p-2"
            selectedClassName="bg-blue-300 text-black rounded-md p-2">
            Contact Details
          </Tab>

          <Tab
            className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 no-select p-2"
            selectedClassName="bg-blue-300 text-black rounded-md p-2">
            Postal Address
          </Tab>

          <Tab
            className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 no-select p-2"
            selectedClassName="bg-blue-300 text-black rounded-md p-2">
            Password
          </Tab>

          <div
            className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 no-select p-2"
            // selectedClassName="bg-blue-300 text-black rounded-md p-2"
            onClick={() => {
              document.getElementById('AddNewEmployeeModal').showModal()
            }}
            role="button"
            tabIndex="0"
          >
            Create Employee
          </div>

          <div className='ml-auto pr-6'>
            <button
              type="button"
              className="btn btn-wide bg-blue-400 hover:bg-transparent outline-blue-600 text-black border-blue-600"
              onClick={updateEmployee}
            >
              Upload Changes
            </button>
          </div>

        </TabList>

        <TabPanel>
          <HomeEmploy />
        </TabPanel>

        <TabPanel>
          <Empcontact />
        </TabPanel>

        <TabPanel>
          <Empaddress />
        </TabPanel>

        <TabPanel>
          <Emppass />
        </TabPanel>

      </Tabs>
      <CreateNewEmployee />
    </div>
  )
}