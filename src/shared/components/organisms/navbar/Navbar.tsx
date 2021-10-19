import { Button } from 'antd';
import cn from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { showDrawer } from '../../../../redux-features/common';
import styles from './navbar.module.scss';

export interface INavbarItem {
  name: string;
  url: string;
}

export interface INavbar {
  isUserLoggedin: boolean;
  navbarItemList: Array<INavbarItem>;
}

const Navbar: React.FC<INavbar> = ({ isUserLoggedin, navbarItemList }) => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(showDrawer('login'));
  };

  const handleLogout = () => {
    // TODO
    console.log('user logged out..');
  };

  const getNavbarItemView = (navItem: INavbarItem, index: number) => {
    return (
      <li key={index}>
        <Link className={styles.navListItem} to={navItem.url}>
          {navItem.name}
        </Link>
      </li>
    );
  };

  return (
    <div className={cn(styles.navbarWrapper, styles.flexWrapper)}>
      <div className={styles.logo}></div>
      <div className={styles.navItems}>
        <ul className={styles.navList}>{navbarItemList.map(getNavbarItemView)}</ul>
      </div>
      <div className={styles.link}>
        {isUserLoggedin ? (
          <Button className={styles.btnLink} type="link" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button className={styles.btnLink} type="link" onClick={handleLogin}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
