import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import cn from 'classnames';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { logoutUser } from '../../../../redux-features/auth';
import { showDrawer } from '../../../../redux-features/common';
import { routes } from '../../../../routes';
import { IGlobalState } from '../../../interfaces/globalState';
import UserAvatar from '../../atoms/avatar/Avatar';
import { INavbarItem } from './navbar.constants';
import styles from './navbar.module.scss';

export interface INavbar {
  isUserLoggedin: boolean;
  navbarItemList: Array<INavbarItem>;
}

const Navbar: React.FC<INavbar> = ({ isUserLoggedin, navbarItemList }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const globalAuthData = useSelector((globalState: IGlobalState) => globalState.auth);
  // const [activeLink, setActiveLink] = useState(navbarItemList[0]?.name);

  const handleButtonClick = () => {
    if (isUserLoggedin) {
      dispatch(logoutUser());
    } else {
      dispatch(showDrawer('login'));
    }
  };

  const navbarItemView = (navItem: INavbarItem, index: number) => {
    return (
      <li key={index}>
        <Link to={navItem.url}>{navItem.name}</Link>
      </li>
    );
  };

  const roleBasedNavbarItem = (navItem: INavbarItem) => {
    const { loggedinUserRole } = globalAuthData;
    return navItem.roles?.includes('all') || navItem.roles?.includes(loggedinUserRole);
  };

  const handleDropdownMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'user-profile':
        history.push(routes.profile);
        break;
      case 'logout':
        //logout user
        break;
      default:
        return;
    }
  };

  const dropdownMenu = (
    <Menu onClick={handleDropdownMenuClick}>
      <Menu.Item key="user-profile" icon={<UserOutlined />}>
        User profile
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={cn(styles.navbarWrapper, styles.flexWrapper)}>
      <div className={styles.logo}></div>
      <div className={styles.navItems}>
        <ul className={styles.navList}>
          {navbarItemList.filter(roleBasedNavbarItem).map(navbarItemView)}
        </ul>
      </div>
      {isUserLoggedin ? (
        <div className={styles.settingAndLoginWrapper}>
          <Dropdown trigger={['click']} overlay={dropdownMenu} arrow>
            <SettingOutlined onClick={(e) => e.preventDefault()} />
          </Dropdown>
          <UserAvatar label="saurav" />

          {/* <Button className={styles.btnLink} type="link" onClick={handleButtonClick}>
            Logout
          </Button> */}
        </div>
      ) : (
        <div className={styles.settingAndLoginWrapper}>
          <Button className={styles.btnLink} type="link" onClick={handleButtonClick}>
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
