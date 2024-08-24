import React from 'react'
import { NavLink } from 'react-router-dom'
import { LuUser2 } from "react-icons/lu";

const UserMenu = () => {
  return (
    <>
       <div className='text-center'>
    <div className="list-group dashboard-menu">
  <h4>Dashboard</h4>
  <NavLink to ="/dashboard/user/profile" className="list-group-item list-group-item-action">
  <LuUser2 />  Profile
  </NavLink>
  <NavLink to ="/dashboard/user/orders" className="list-group-item list-group-item-action">
    Orders
  </NavLink>
  </div>

</div>
    </>
  )
}

export default UserMenu