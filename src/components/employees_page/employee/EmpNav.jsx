import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Empcontact from './Empcontact';
import Empaddress from './Empaddress';
import HomeEmploy from './HomeEmploy';
import Emppass from './Emppass';

export default function EmpNav() {
  return (
    <div className="bg-slate-100 rounded h-full">
      <Tabs>
        <TabList className="flex justify-start list-none p-4 gap-10 bg-slate-100 pl-8">
          <Tab 
            className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 p-2" 
            selectedClassName="bg-blue-300 text-black rounded-md p-2">
              Employee Details
          </Tab>

          <Tab 
            className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 p-2" 
            selectedClassName="bg-blue-300 text-black rounded-md p-2">
              Contact Details
          </Tab>

          <Tab 
            className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 p-2" 
            selectedClassName="bg-blue-300 text-black rounded-md p-2">
              Postal Address
          </Tab>

          <Tab 
            className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 p-2" 
            selectedClassName="bg-blue-300 text-black rounded-md p-2">
              Password
          </Tab>
        
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
    </div>
  )
}