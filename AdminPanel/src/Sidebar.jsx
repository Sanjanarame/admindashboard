import React from 'react';
import { BsFillGrid3X3GapFill, BsPersonCircle, BsPower } from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <img src="/images/logo.jpg" alt="Quiz" className="Quiz" />
          <span>QUIZ</span> {/* Added the word QUIZ beside the logo */}
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href="">
            <BsFillGrid3X3GapFill className='icon' /> Dashboard
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsPersonCircle className='icon' /> Profile
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsPower className='icon' /> Logout
          </a>
        </li>
      </ul>

      <style jsx>{`
        #sidebar {
          background-color: #AB886D; /* Background color */
        }

        .sidebar-list-item a {
          color: #000; /* Black color for the text */
        }

        .sidebar-brand {
          display: flex;
          align-items: center; /* Ensures the logo and text are aligned */
        }

        .sidebar-brand img {
          height: 40px; /* Adjust logo size */
          width: 40px; /* Adjust logo size */
        }

        .sidebar-brand span {
          font-size: 24px; /* Font size for "QUIZ" */
          margin-left: 10px; /* Space between logo and text */
          font-weight: bold; /* Bold font for the word "QUIZ" */
        }
      `}</style>
    </aside>
  );
}

export default Sidebar;
