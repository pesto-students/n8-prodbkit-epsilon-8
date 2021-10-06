import React from 'react';
import { Drawer } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { hideDrawer } from '../../../../redux-features/common';
import { drawerNameMap, keyMap } from '../../../constants';
import { IGlobalState } from '../../../../interfaces/globalState';

import styles from './drawer.module.scss';

const CustomDrawer: React.FC = (props) => {
  const dispatch = useDispatch();
  const commonData = useSelector((state: IGlobalState) => state.common);

  const onCloseDrawer = () => {
    dispatch(hideDrawer());
  };

  const renderDrawerHeader = () => {
    return (
      <div className={cn(styles.drawerHeader, styles.headerText)}>
        {drawerNameMap[commonData.drawerKey]}
      </div>
    );
  };

  const getDrawerContentFromKey = () => {
    if (commonData.drawerKey === '') {
      return <></>;
    }
    const DrawerRenderComponent = (keyMap as Record<string, React.FC>)[
      commonData.drawerKey as string
    ];
    return <DrawerRenderComponent />;
  };

  const DrawerBody = () => {
    return (
      <>
        {renderDrawerHeader()}
        {getDrawerContentFromKey()}
      </>
    );
  };

  return (
    <Drawer
      {...props}
      className={styles.drawer}
      visible={commonData.isDrawerVisible}
      bodyStyle={{ padding: 0 }}
      onClose={onCloseDrawer}
      width={400}
    >
      <DrawerBody />
    </Drawer>
  );
};

export default CustomDrawer;
