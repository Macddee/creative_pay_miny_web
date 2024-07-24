import React from 'react'
import logo from '../assets/creative pay logo.png';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbar text-black shadow-gray shadow-md">

        <div className="flex-1 px-2">
            <div className="avatar">
                <div className="w-36 h-10 rounded object-fill">
                    <img src={logo} />
                </div>
            </div>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1 space-x-3">
                {/* <li><Link to="/">Home</Link></li> */}
                <li><Link to="/employees">Employees</Link></li>
                <li><Link to="/transactions">Transactions</Link></li>
                <li><Link to="/processes">Processes</Link></li>
                <li><Link to="/reports">Reports</Link></li>
                <li><Link to="/utilities">Utilities</Link></li>
            </ul>
        </div>
    </div>
  )
}
