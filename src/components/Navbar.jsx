import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import logo from '/assets/creative pay logo.png';
import AdditionalSettings from './AdditionalSettings';
import { useDataContexts } from '../ContextProviders/DataContexts';

export default function Navbar() {
  const auth = useAuth();
  const [selectedItem, setSelectedItem] = useState('/');
  const { showSideBar, setShowSideBar } = useDataContexts()
  // const [menuShown, setMenuShown] = useState(false);


  const handleItemClick = (path) => {
    setSelectedItem(path);
  };

  useEffect(() => {
    const checkbox = document.getElementById('my-drawer-4');
    const handleClickOutside = (e) => {
      console.log("Event target:", e.target);
      console.log("Event target classes:", e.target.classList);
      if (checkbox && !checkbox.contains(e.target)) {
        let targetElement = e.target; // Clicked element
        // Traverse up the DOM tree to check for the 'sidebar-item' class
        while (targetElement) {
          if (targetElement.classList && targetElement.classList.contains('sidebar-item')) {
            return; // Exit the function if a sidebar item is clicked
          }
          targetElement = targetElement.parentElement; // Move up the DOM tree
        }
        setShowSideBar(false)
      }
    };

    if (showSideBar) {
      checkbox.checked = showSideBar
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSideBar])


  function handleMenuClick() {
    setShowSideBar(!showSideBar)
  };

  return (
    auth.user ? (
      <div className="navbar h-full justify-between ">
        <div className="flex-1 px-2">
          <div className="avatar">
            <div className="w-36 h-10 rounded object-fill m-5">
              <Link to="/employees"><img src={logo} alt="Logo" /></Link>
            </div>
          </div>
        </div>

        {showSideBar &&
          <AdditionalSettings />
        }

        <div className="flex-none text-black">
          <ul className="menu menu-horizontal px-1 space-x-3 text-black">
            {/* <li className={`hover:bg-blue-200 hover:rounded-lg ${selectedItem === '/' ? 'bg-blue-200 rounded-lg text-black' : ''}`}>
              <Link to="/" onClick={() => handleItemClick('/')}>Home</Link>
            </li> */}
            <li className={`hover:bg-blue-200 hover:rounded-lg ${selectedItem === '/employees' ? 'bg-blue-200 rounded-lg' : ''}`}>
              <Link to="/employees" onClick={() => handleItemClick('/employees')}>Employees</Link>
            </li>
            <li className={`hover:bg-blue-200 hover:rounded-lg ${selectedItem === '/transactions' ? 'bg-blue-200 rounded-lg' : ''}`}>
              <Link to="/transactions" onClick={() => handleItemClick('/transactions')}>Transactions</Link>
            </li>
            {/* <li className={`hover:bg-blue-200 hover:rounded-lg ${selectedItem === '/processes' ? 'bg-blue-200 rounded-lg' : ''}`}>
              <Link to="/processes" onClick={() => handleItemClick('/processes')}>Processes</Link>
            </li>
            <li className={`hover:bg-blue-200 hover:rounded-lg ${selectedItem === '/reports' ? 'bg-blue-200 rounded-lg' : ''}`}>
              <Link to="/reports" onClick={() => handleItemClick('/reports')}>Reports</Link>
            </li>
            <li className={`hover:bg-blue-200 hover:rounded-lg ${selectedItem === '/utilities' ? 'bg-blue-200 rounded-lg' : ''}`}>
              <Link to="/utilities" onClick={() => handleItemClick('/utilities')}>Utilities</Link>
            </li> */}
            <li className={`hover:bg-blue-200 hover:rounded-lg ${selectedItem === '/adminstrators' ? 'bg-blue-200 rounded-lg' : ''}`}>
              <Link to="/adminstrators" onClick={() => handleItemClick('/adminstrators')}>Admin</Link>
            </li>

            <li className={`hover:bg-blue-200 hover:rounded-lg ${selectedItem === '/profile' ? 'bg-blue-200 rounded-lg' : ''}`}>
              <Link to="/profile" onClick={() => handleItemClick('/profile')}>Profile</Link>
            </li>
            {/* className="btn btn-primary drawer-button"> */}

            <li
              onClick={() => handleMenuClick()}
              htmlFor="my-drawer"
              className={`drawer-button hover:bg-blue-200 hover:rounded-lg ${selectedItem === '/additional-settings' ? 'bg-blue-200 rounded-lg' : ''}`}>
              <a>Additional-settings</a>
            </li>
          </ul>
        </div>
      </div>
    ) : null

  );
}