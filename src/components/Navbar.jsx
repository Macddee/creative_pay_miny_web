import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import logo from '/assets/creative pay logo.png';

export default function Navbar() {
  const auth = useAuth();
  const [selectedItem, setSelectedItem] = useState('/');

  const handleItemClick = (path) => {
    setSelectedItem(path);
  };

  return (
    auth.user ? (
      <div className="navbar h-full">
        <div className="flex-1 px-2">
          <div className="avatar">
            <div className="w-36 h-10 rounded object-fill m-5">
              <Link to="/employees"><img src={logo} alt="Logo" /></Link>
            </div>
          </div>
        </div>
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
          </ul>
        </div>
      </div>
    ) : null
  );
}