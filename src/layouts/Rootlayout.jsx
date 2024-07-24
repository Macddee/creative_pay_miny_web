import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function 
() {
  return (
    <div className=''>
        <Nav>
            <NavLink to="/">Main</NavLink>
        <NavLink to="employees">Employees</NavLink>
        </Nav>

        <main>
            <Outlet />
        </main>
        
    </div>


  )
}
