import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Empcompany from './Empcompany'
import Empstoppay from './Empstoppay'

export default function CompanyNav() {
  
  const updateEmployee = () => {
    fetch('https://payroll-dinson-backend.creativehr.co.zw/api/edit-masterfile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 2|Oeu868oclTu3vH4xB0Mhv2NLOGA8jbMP20823IFZ43649fa8`
      },
      body: JSON.stringify({ "cp_employee": [employee] })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  return (
    <div className="bg-slate-100 rounded h-full">
      <Tabs>
        <TabList className="flex justify-start list-none p-4 gap-10 bg-slate-100 pl-8">
          <Tab 
            className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 no-select p-2" 
            selectedClassName="bg-blue-300 text-black rounded-md p-2">
              Company Details
          </Tab>

          <Tab 
            className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 no-select p-2" 
            selectedClassName="bg-blue-300 text-black rounded-md p-2">
              StopPay
          </Tab>

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
          <Empcompany />
          {/* <Empcompany /> */}
        </TabPanel>

        <TabPanel>
          <Empstoppay />
        </TabPanel>
      </Tabs>
    </div>
  )
}