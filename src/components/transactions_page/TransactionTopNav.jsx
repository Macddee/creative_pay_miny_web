import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Transactions from './Transactions';
import Masterfile from './Masterfile';

export default function CompanyNav() {
  return (
    <div className="bg-slate-100 rounded h-full">
      <Tabs>
        <TabList className="flex justify-start list-none p-4 gap-10 bg-slate-100 pl-8">
          <Tab 
            className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 p-2" 
            selectedClassName="bg-blue-300 text-black rounded-md p-2">
              Transaction Batches
          </Tab>

          <Tab 
            className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 p-2" 
            selectedClassName="bg-blue-300 text-black rounded-md p-2">
              Masterfile Batches
          </Tab>
        
        </TabList>

        <TabPanel>
          <Transactions />
        </TabPanel>

        <TabPanel>
          <Masterfile />
        </TabPanel>
      </Tabs>
    </div>
  )
}