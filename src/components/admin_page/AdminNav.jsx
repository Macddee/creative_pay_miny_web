import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Admin from './Admin';
import EditRights from './EditRights';

export default function TransactionNav() {
  return (
    <div className="bg-slate-100 rounded">
      <Tabs>
        <TabList className="flex justify-start list-none p-4 gap-10 bg-slate-100 pl-8 pb-0">
          <Tab 
            className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 no-select p-2" 
            selectedClassName="bg-blue-300 text-black rounded-md p-2">
              Create Admin Users
          </Tab>

          <Tab 
            className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 no-select p-2" 
            selectedClassName="bg-blue-300 text-black rounded-md p-2">
              Edit Payroll Rights
          </Tab>
        
        </TabList>

        <TabPanel>
          <Admin />
        </TabPanel>

        <TabPanel>
          <EditRights />
        </TabPanel>
      </Tabs>
    </div>
  )
}