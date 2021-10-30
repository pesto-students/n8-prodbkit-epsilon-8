import { Space } from 'antd';
import cn from 'classnames';
import { isEmpty } from 'lodash';
import MainApp from 'pages/mainApp';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { loginUser, logoutUser } from 'redux-features/auth';
import AntDDrawer from 'shared/components/organisms/drawer/Drawer';
import AntDModal from 'shared/components/organisms/modal/Modal';

import styles from './app.module.scss';

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.App}>
        <BrowserRouter>
          <MainApp />
        </BrowserRouter>
        <footer>
          <div className={cn(styles.footerWrapper, styles.positionBottom)}>
            <Space size={16}>
              <span>Ninja8 project - Pro DB kit</span>
              <span>&copy; Team Epsilon</span>
            </Space>
          </div>
        </footer>
        <AntDDrawer />
        <AntDModal />
      </div>
    </QueryClientProvider>
  );
};

export default App;
