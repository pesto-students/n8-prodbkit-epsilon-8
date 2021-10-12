import { Drawer } from 'antd';
import cn from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideDrawer } from '../../../../redux-features/common';
import { drawerNameMap, keyMap } from '../../../constants';
import { IGlobalState } from '../../../interfaces/globalState';
import styles from './drawer.module.scss';

const AntDDrawer: React.FC = (props) => {
  const dispatch = useDispatch();
  const commonData = useSelector((state: IGlobalState) => state.common);

  const onCloseDrawer = () => {
    dispatch(hideDrawer());
  };

  const renderDrawerHeader = () => {
    return (
      <div className={cn(styles.drawerHeader, styles.headerText)}>
        {drawerNameMap[commonData.drawerTitle]}
      </div>
    );
  };

  const getDrawerContentFromKey = () => {
    if (commonData.drawerTitle === '') {
      return <></>;
    }
    const DrawerRenderComponent = (keyMap as Record<string, React.FC>)[
      commonData.drawerTitle as string
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

export default AntDDrawer;
