import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Empcompany from './Empcompany'
import Empstoppay from './Empstoppay'
import { useDataContexts } from '../../../ContextProviders/DataContexts';
import Loading from '../../Loading';
import PopupMsg from '../../PopupMsg';
import { FaCloudUploadAlt } from 'react-icons/fa';

export default function CompanyNav() {
  const {
    employee,
    token, postUrl,
    isLoading,
    setIsLoading,
    showPopupMsg, setShowPopupMsg,
    popupContent, setPopupContent,
  } = useDataContexts();

  const updateEmployee = () => {
    setIsLoading(true)
    const requestBody = JSON.stringify({
      "cp_employee": [employee]
    });

    console.log(requestBody); 

    fetch(postUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },

      body: requestBody
    })
      .then(response => response.json())
      .then(data => {
        setPopupContent(data.message)
        setShowPopupMsg(true)
        setIsLoading(false)
      })
      .catch(error => {
        setPopupContent(error.message)
        setShowPopupMsg(true)
        setIsLoading(false)
      });
  }

  return (
    isLoading
    ? <Loading />
    : <div className="bg-slate-100 rounded h-full">
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
              onClick = {() => {
                updateEmployee()
              }}
            >
              <span className='text-black text-2xl'><FaCloudUploadAlt /></span>Upload Changes
            </button>
          </div>
        
        </TabList>

        <TabPanel>
          <Empcompany />
        </TabPanel>

        <TabPanel>
          <Empstoppay />
        </TabPanel>
      </Tabs>
      {showPopupMsg &&
          <PopupMsg message={popupContent} />
        }
    </div>
  )
}