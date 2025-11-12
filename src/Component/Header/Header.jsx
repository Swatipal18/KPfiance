// Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, ChevronDown, LogOut, User } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from './Header.module.css';
import logo from '../../assets/images/1b7304b285d08c0f8b29f8fc61ad6621680532e7.jpg';

const Header = () => {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [recentSearches] = useState([
    'Budget Report 2024',
    'Loan Application',
    'Financial Statement',
    'KP Finance Analysis'
  ]);

  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Get user data from localStorage
  useEffect(() => {
    const name = localStorage.getItem('userName') || 'Dawal';
    const role = localStorage.getItem('userRole') || 'Admin';
    setUserName(name);
    setUserRole(role);
  }, []);

  // Close modals on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchModalOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // API call for logout using axios
  const handleLogout = async () => {
    try {
      toast.loading('Logging out...', { id: 'logout' });

      // Real axios implementation:
      // const response = await axios.post('http://localhost:5174/api/logout'
      // });

      // Simulating API call
      // await new Promise(resolve => setTimeout(resolve, 1000));

      // // Clear localStorage
      // localStorage.removeItem('userName');
      // localStorage.removeItem('userRole');
      // localStorage.removeItem('authToken');

      // toast.success('Logged out successfully!', { id: 'logout' });

      // // Redirect to login page
      // setTimeout(() => {
      //   window.location.href = '/login';
      // }, 1000);
    } catch (error) {
      toast.error('Logout failed. Please try again.', { id: 'logout' });
      console.error('Logout error:', error);
    }
  };

  const handleSearchClick = (e) => {
    e.stopPropagation();
    setSearchModalOpen(true);
  };

  const handleRecentSearchClick = (search) => {
    toast.success(`Searching for: ${search}`);
    setSearchModalOpen(false);
  };

  const handleProfileClick = () => {
    // toast.success('Opening profile...');
    setDropdownOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          Loan/KPFinance/2025
        </div>

        <div className={styles.searchContainer} ref={searchRef}>
          <div className={styles.searchWrapper}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search here..."
              className={styles.searchInput}
              onClick={handleSearchClick}
              readOnly
            />
          </div>

          {searchModalOpen && (
            <div className={styles.searchModal}>
              <div className={styles.searchModalTitle}>Recent Searches</div>
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  className={styles.recentSearchItem}
                  onClick={() => handleRecentSearchClick(search)}
                >
                  {search}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.rightSection}>
          <div
            className={styles.notificationIcon}
            onClick={() => toast('You have 3 new notifications')}
          >
            <Bell size={20} />
            <span className={styles.badge}>3</span>
          </div>

          <div
            className={styles.userSection}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            ref={dropdownRef}
          >
            <img
              src={logo}
              alt={userName}
              className={styles.avatar}
            />
            <div className={styles.userInfo}>
              <span className={styles.userName}>{userName}</span>
              <span className={styles.userRole}>{userRole}</span>
            </div>
            <ChevronDown size={16} />

            {dropdownOpen && (
              <div className={styles.dropdown}>
                <button
                  className={styles.dropdownItem}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProfileClick();
                  }}
                >
                  <User size={18} />
                  <span>Profile</span>
                </button>
                <button
                  className={`${styles.dropdownItem} ${styles.logoutItem}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogout();
                  }}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;