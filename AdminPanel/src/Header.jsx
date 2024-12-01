import React, { useState, useEffect, useRef } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';

function Header({ OpenSidebar }) {
  // State management
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample quiz-related data
  const initialNotifications = [
    "New quiz submission received for 'Math Quiz 101'",
    "Quiz 'History of Rome' deadline is tomorrow",
    "New response from 'Science Quiz' by user John Doe",
    "New quiz 'General Knowledge' published"
  ];
  const initialMessages = [
    "You have a new message from Sarah",
    "John Doe commented on your quiz",
    "Reminder: Review the quiz 'Math Quiz 101'"
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const [messages, setMessages] = useState(initialMessages);

  // Refs for dropdowns
  const notificationsRef = useRef();
  const messagesRef = useRef();
  const profileRef = useRef();

  // Handlers
  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleNotificationClick = (index) => setNotifications(notifications.filter((_, i) => i !== index));
  const handleMessageClick = (index) => setMessages(messages.filter((_, i) => i !== index));

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current && !notificationsRef.current.contains(event.target) &&
        messagesRef.current && !messagesRef.current.contains(event.target) &&
        profileRef.current && !profileRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
        setShowMessages(false);
        setShowProfile(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>

      <div className="header-left">
        <div className="search-icon" onClick={() => setShowSearch(!showSearch)}>
          <BsSearch className="icon" />
        </div>
        {showSearch && (
          <div className="search-input">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search quizzes..."
            />
          </div>
        )}
      </div>

      <div className="header-right">
        <div className="notification-bell" onClick={() => setShowNotifications(!showNotifications)} ref={notificationsRef}>
          <BsFillBellFill className="icon" />
          {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
          {showNotifications && (
            <div className="notification-dropdown">
              <ul>
                {notifications.map((notification, index) => (
                  <li key={index} onClick={() => handleNotificationClick(index)}>
                    {notification}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="messages" onClick={() => setShowMessages(!showMessages)} ref={messagesRef}>
          <BsFillEnvelopeFill className="icon" />
          {messages.length > 0 && <span className="badge">{messages.length}</span>}
          {showMessages && (
            <div className="message-dropdown">
              <ul>
                {messages.map((message, index) => (
                  <li key={index} onClick={() => handleMessageClick(index)}>
                    {message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="profile" onClick={() => setShowProfile(!showProfile)} ref={profileRef}>
          <BsPersonCircle className="icon" />
          {showProfile && (
            <div className="profile-dropdown">
              <ul>
                <li>View Profile</li>
                <li>Settings</li>
                <li>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          background-color: #493628;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .menu-icon {
          font-size: 24px;
          cursor: pointer;
          color: #ecf0f1;
        }
        .header-left {
          display: flex;
          align-items: center;
        }
        .header-left .icon {
          font-size: 20px;
          margin-right: 20px;
          color: #ecf0f1;
        }
        .search-input input {
          padding: 5px 10px;
          font-size: 16px;
          border-radius: 4px;
          border: 1px solid #7f8c8d;
          margin-left: 10px;
          width: 200px;
        }
        .header-right {
          display: flex;
          align-items: center;
        }
        .header-right .icon {
          font-size: 22px;
          margin-left: 20px;
          cursor: pointer;
          color: #ecf0f1;
        }
        .notification-bell, .messages, .profile {
          position: relative;
          cursor: pointer;
        }
        .badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background-color: #f39c12;
          color: white;
          font-size: 12px;
          font-weight: bold;
          border-radius: 50%;
          padding: 5px 10px;
        }
        .notification-dropdown,
        .message-dropdown,
        .profile-dropdown {
          position: absolute;
          top: 30px;
          right: 0;
          background-color: #34495e;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          width: 250px;
          max-height: 200px;
          overflow-y: auto;
          padding: 10px;
          z-index: 1000;
        }
        .notification-dropdown ul,
        .message-dropdown ul,
        .profile-dropdown ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        .notification-dropdown li,
        .message-dropdown li,
        .profile-dropdown li {
          padding: 8px;
          border-bottom: 1px solid #7f8c8d;
          color: #ecf0f1;
          font-size: 14px;
        }
        .notification-dropdown li:last-child,
        .message-dropdown li:last-child,
        .profile-dropdown li:last-child {
          border-bottom: none;
        }
        .notification-dropdown li:hover,
        .message-dropdown li:hover,
        .profile-dropdown li:hover {
          background-color: #16a085;
        }
      `}</style>
    </header>
  );
}

export default Header;
