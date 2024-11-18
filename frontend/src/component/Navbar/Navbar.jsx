import React from 'react'
import "./index.css"
import {Link} from "react-router-dom"
export const Navbar = () => {
  return (
    <div>
      <nav className='max-w-[1920px] h-[72px] mx-auto flex flex-row justify-between items-center px-[50px] font-seminold'>
        <div className="text-[20px] font-bold">HCMUT-Course</div>
        <ul className="flex flex-row cursor-pointer">
          <li className="px-[20px] hover:bg-lightGrey py-[25px] font-semibold hover:text-primary">

            <Link to = "/" Home></Link>
          </li>
          <li className="px-[20px] hover:bg-lightGrey py-[25px] font-semibold hover:text-primary">
          <Link to = "/courses" >Course</Link>
          </li>
        </ul>
        <div className="font-semibold">Login/Register</div>
      </nav>
    </div>
  )
}
