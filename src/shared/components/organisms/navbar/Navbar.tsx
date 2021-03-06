import { LogoutOutlined } from '@ant-design/icons';
import { Button, Image, Space } from 'antd';
import logo from 'assets/database.png';
import cn from 'classnames';
import JWTDecode from 'jwt-decode';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { logoutUser } from 'redux-features/auth';
import { showDrawer } from 'redux-features/commonDrawer';
import { routes } from 'routes';
import UserAvatar from 'shared/components/atoms/avatar/Avatar';

import { INavbarItem } from './navbar.constants';
import styles from './navbar.module.scss';
export interface INavbar {
  isUserLoggedin: boolean;
  navbarItemList: Array<INavbarItem>;
}

const Navbar: React.FC<INavbar> = ({ isUserLoggedin, navbarItemList }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleUserLogin = () => {
    dispatch(showDrawer({ key: 'login' }));
  };

  const handleUserLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('jwt_token');
    history.push(routes.home);
  };

  const getNavbarItemView = (navItem: INavbarItem, index: number) => {
    return (
      <li key={index}>
        <Link to={navItem.url}>{navItem.name}</Link>
      </li>
    );
  };

  const getUserEmail = () => {
    const jwt = localStorage.getItem('jwt_token') || '';
    try {
      const { username }: { username: string } = JWTDecode(jwt);
      return username;
    } catch (error) {
      console.log(error);
      return 'guest-user@prodbkit.io';
    }
  };

  return (
    <div className={cn(styles.navbarWrapper, styles.flexWrapper)}>
      <div className={styles.logo}></div>
      <div className={styles.navItems}>
        <ul className={styles.navList}>{navbarItemList.map(getNavbarItemView)}</ul>
      </div>
      {isUserLoggedin ? (
        <Space className={styles.settingAndLoginWrapper} direction="horizontal" size={16}>
          <UserAvatar label={getUserEmail()} size={26} />
          <Button
            className={styles.btnLink}
            type="link"
            icon={<LogoutOutlined />}
            onClick={handleUserLogout}
          >
            Logout
          </Button>
        </Space>
      ) : (
        <div className={styles.settingAndLoginWrapper}>
          <Button className={styles.btnLink} type="link" onClick={handleUserLogin}>
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
