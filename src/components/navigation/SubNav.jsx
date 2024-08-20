import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function SubNav({ tabs }) {
  return (
    <div className="bg-slate-100 rounded h-full">
      <Tabs>
        <TabList className="flex justify-start list-none p-4 gap-10 bg-slate-100 pl-8">
          {tabs.map((tab, index) => (
            <Tab 
              key={index}
              className="text-lg font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600 no-select p-2" 
              selectedClassName="bg-blue-300 text-black rounded-md p-2">
                {tab.name}
            </Tab>
          ))}
        </TabList>

        {tabs.map((tab, index) => (
          <TabPanel key={index}>
            <tab.component />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}

// usage . . .
import HomeEmploy from './HomeEmploy';
import Empcontact from './Empcontact';
import Empaddress from './Empaddress';
import Emppass from './Emppass';

<NavComponents 
  tabs={[
    { name: 'Employee Details', component: HomeEmploy },
    { name: 'Contact Details', component: Empcontact },
    { name: 'Postal Address', component: Empaddress },
    { name: 'Password', component: Emppass },
  ]}
/>