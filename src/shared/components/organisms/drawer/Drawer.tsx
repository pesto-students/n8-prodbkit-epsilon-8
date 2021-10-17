import { Drawer } from 'antd';
import cn from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideDrawer } from 'redux-features/common';
import { drawerNameMap, keyMap } from 'shared/constants';
import { IGlobalState } from 'shared/interfaces/globalState';

import styles from './drawer.module.scss';

const AntDDrawer: React.FC = (props) => {
  const dispatch = useDispatch();
  const commonStoreData = useSelector((state: IGlobalState) => state.common);

  const onCloseDrawer = () => {
    dispatch(hideDrawer());
  };

  const renderDrawerHeader = () => {
    return (
      <div className={cn(styles.drawerHeader, styles.headerText)}>
        {drawerNameMap[commonStoreData.drawerTitle]}
      </div>
    );
  };

  const getDrawerContentFromKey = () => {
    if (commonStoreData.drawerTitle === '') {
      return <></>;
    }
    const DrawerRenderComponent = (keyMap as Record<string, React.FC>)[
      commonStoreData.drawerTitle as string
    ];
    return <DrawerRenderComponent />;
  };

  const DrawerBody = () => {
    return (
      <>
        {renderDrawerHeader()}
        <div className={styles.drawerBody}>{getDrawerContentFromKey()}</div>
      </>
    );
  };

  return (
    <Drawer
      {...props}
      visible={commonStoreData.isDrawerVisible}
      bodyStyle={{ padding: 0 }}
      onClose={onCloseDrawer}
      width={400}
    >
      <DrawerBody />
    </Drawer>
  );
};

export default AntDDrawer;
