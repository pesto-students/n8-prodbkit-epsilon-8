import React from 'react';

import { Link } from 'react-router-dom';
import { Button } from 'antd';
import cn from 'classnames';

import styles from './navbar.module.scss';
import { useDispatch } from 'react-redux';
import { showDrawer } from '../../../../redux-features/common';

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

  const handleButtonClick = () => {
    if (isUserLoggedin) {
    } else {
      dispatch(showDrawer('login'));
    }
  };

  const getNavbarItemView = (navItem: INavbarItem, index: number) => {
    return (
      <li key={index}>
        <Link to={navItem.url}>{navItem.name}</Link>
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
        <Button className={styles.btnLink} type="link" onClick={handleButtonClick}>
          {isUserLoggedin ? 'Logout' : 'Login'}
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
