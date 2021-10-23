import { LogoutOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import cn from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { logoutUser } from 'redux-features/auth';
import { showDrawer } from 'redux-features/commonDrawer';
import { routes } from 'routes';
import UserAvatar from 'shared/components/atoms/avatar/Avatar';
import { IGlobalState } from 'shared/interfaces/globalState';

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
    const { userDetails } = globalAuthData;
    return userDetails.email;
  };

  // TODO - the below code is for role based authentication - for future scope

  // const roleBasedNavbarItem = (navItem: INavbarItem) => {
  //   const { loggedinUserRole } = globalAuthData;
  //   return navItem.roles?.includes('all') || navItem.roles?.includes(loggedinUserRole);
  // };

  // const handleDropdownMenuClick = ({ key }: { key: string }) => {
  //   switch (key) {
  //     case 'user-profile':
  //       history.push(routes.profile);
  //       break;
  //     case 'logout':
  //       handleButtonClick();
  //       break;
  //     default:
  //       return;
  //   }
  // };

  // const dropdownMenu = (
  //   <Menu onClick={handleDropdownMenuClick}>
  //     <Menu.Item key="user-profile" icon={<UserOutlined />}>
  //       User profile
  //     </Menu.Item>
  //     <Menu.Item key="logout" icon={<LogoutOutlined />}>
  //       Logout
  //     </Menu.Item>
  //   </Menu>
  // );

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
