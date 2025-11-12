import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';
import SvgIcon, { Database, Hover, HoverDatabase, HoverMail, HoverReports, HoverSettings, HoverTrash, HoverUser, Logo, Mail, Reports, Settings, Trash, User } from '../SvgIcon/SvgIcon';

export default function Sidebar() {
  const location = useLocation();
  const navItems = [
    {
      label: 'Dashboard',
      path: '/Dashboard',
      icon: <SvgIcon />,
      hoverIcon: <Hover />
    },
    {
      label: 'Customers',
      path: '/Customers',
      icon: <Database />,
      hoverIcon: <HoverDatabase />
    },
    {
      label: 'Loans',
      path: '/Loans',
      icon: <Mail />,
      hoverIcon: <HoverMail />
    },
    {
      label: 'EMI Management',
      path: '/EMIManagement',
      icon: <User />,
      hoverIcon: <HoverUser />
    },
    {
      label: 'Receipt & NOC ',
      path: '/Receipt',
      icon: <Trash />,
      hoverIcon: <HoverTrash />
    },
    {
      label: 'Reports',
      path: '/Reports',
      icon: <Reports />,
      hoverIcon: <HoverReports />
    },
    {
      label: 'Settings ',
      path: '/Settings',
      icon: <Settings />,
      hoverIcon: <HoverSettings />
    },
  ];

  // Function to check if a nav item should be active
  const isNavItemActive = (itemPath) => {
    const currentPath = location.pathname + location.hash;

    // For Campaigns tab, make it active if current path is /Admin or contains DetailPage
    if (itemPath === '/') {
      return currentPath.includes('/') || currentPath.includes('DetailPage');
    }

    // For other items, check normal path matching
    return currentPath.includes(itemPath);
  };

  return (
    <>
      <aside className={`${styles.sidebar}`}>
        <h3 className='p-4 d-flex align-items-center justify-content-center'>
          <Logo />
          <b className={styles.text}>KPFianance</b>
        </h3>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.path} className={styles.navItem}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${styles.navLink} ${isNavItemActive(item.path) ? styles.activeLink : ''
                  }`
                }
              >
                <div className={styles.iconWrapper}>
                  <span className={styles.defaultIcon}>{item.icon}</span>
                  <span className={styles.hoverIcon}>{item.hoverIcon}</span>
                </div>
                <span className={styles.label}>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}