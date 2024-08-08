import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Empcompany from './Empcompany'
import Empstoppay from './Empstoppay'

export default function CompanyNav() {
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