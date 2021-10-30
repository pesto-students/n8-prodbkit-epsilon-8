import { Space } from 'antd';
import cn from 'classnames';
import MainApp from 'pages/mainApp';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
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
