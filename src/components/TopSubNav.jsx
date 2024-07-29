import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Empcontact from './employees_page/employee/Empcontact';
import Empaddress from './employees_page/employee/Empaddress';
import HomeEmploy from './employees_page/employee/HomeEmploy';

export default function TopSubNav() {
  return (
    <div className="bg-blue-200 rounded h-full">
      <Tabs>
        <TabList className="flex justify-start list-none p-4 gap-10 bg-slate-100 pl-0">
          <Tab 
            className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600" 
            selectedClassName="bg-blue-300 text-black rounded-md p-2">
              Employee Details
          </Tab>

          <Tab 
            className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600" 
            selectedClassName="bg-blue-300 text-black rounded-md p-2">
              Postal Address
          </Tab>

          <Tab 
            className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600" 
            selectedClassName="bg-blue-300 text-black rounded-md p-2">
              Contact Details
          </Tab>

          <Tab 
            className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600" 
            selectedClassName="bg-blue-300 text-black rounded-md p-2">
              Password
          </Tab>
        
        </TabList>

        <TabPanel>
          <HomeEmploy />
        </TabPanel>

        <TabPanel>
          <Empaddress />
        </TabPanel>

        <TabPanel>
          <Empcontact />
        </TabPanel>

        <TabPanel>
          <Empcontact />
        </TabPanel>
      </Tabs>
    </div>
  )
}