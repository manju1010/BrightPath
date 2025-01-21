import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate , useNavigate } from "react-router-dom";
import logo from "../assets/assets_frontend/logo.svg";
import {
  faUsers,
  faChalkboard,
  faCalendarCheck,
  faHome,
  faSignOutAlt,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";


const SideBar = () => {
    const navigate = useNavigate();
  return (
    <div>
       <aside className="w-64 bg-gray-100 p-5 border-r border-gray-300">
              <div className="text-2xl font-bold mb-8 flex items-center text-blue-600">
              <img onClick={()=>navigate('/')} src={logo} alt="Logo" className="max-w-full cursor-pointer mx-auto mb-8" />
              </div>
              <nav>
                <ul>
                  <li  onClick={()=>navigate('/')} className="flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-600">
                    <FontAwesomeIcon icon={faHome} className="mr-3" />
                    Dashboard
                  </li>
                  <li onClick={()=> navigate('/studentDetails')} className="flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-600">
                    <FontAwesomeIcon icon={faUsers} className="mr-3" />
                    Add Students
                  </li>
                  <li onClick={()=> navigate('/studentMarks')} className="flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-600">
                    <FontAwesomeIcon icon={faChalkboard} className="mr-3" />
                    Add Marks
                  </li>
                  <li onClick={()=> navigate('/attendance')} className="flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-600">
                    <FontAwesomeIcon icon={faCalendarCheck} className="mr-3" />
                    Attendance
                  </li>
                </ul>
              </nav>
            </aside>
      
    </div>
  )
}

export default SideBar
