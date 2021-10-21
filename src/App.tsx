import { Space } from 'antd';
import cn from 'classnames';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { routes } from 'routes';
import Loader from 'shared/components/atoms/loader/Loader';
import AntDDrawer from 'shared/components/organisms/drawer/Drawer';
import AntDModal from 'shared/components/organisms/modal/Modal';
import Navbar from 'shared/components/organisms/navbar/Navbar';
import {
  loggedinNavList,
  loggedOutNavList,
} from 'shared/components/organisms/navbar/navbar.constants';
import { IGlobalState } from 'shared/interfaces/globalState';

import styles from './app.module.scss';

const Teams = React.lazy(() => import('pages/teams'));
const Overview = React.lazy(() => import('./pages/dashboard'));
const Members = React.lazy(() => import('pages/members'));
const Databases = React.lazy(() => import('pages/databases'));
const AuditLogs = React.lazy(() => import('./pages/auditLogs'));
const UserCredentials = React.lazy(() => import('pages/userCredentials'));
const Profile = React.lazy(() => import('./pages/profile'));
const Home = React.lazy(() => import('./pages/landingPage'));

const App: React.FC = () => {
  const queryClient = new QueryClient();
  // const [token, setToken] = useState(null);

  const globalAuthData = useSelector((globalState: IGlobalState) => globalState.auth);

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <div className={styles.App}>
          <BrowserRouter>
            <header>
              <Navbar
                isUserLoggedin={globalAuthData.isUserLoggedin}
                navbarItemList={globalAuthData.isUserLoggedin ? loggedinNavList : loggedOutNavList}
              />
            </header>
            <React.Suspense fallback={<Loader />}>
              <Switch>
                <Route exact path={routes.default} component={Overview} />
                <Route exact path={routes.home} component={Home} />
                <Route exact path={routes.default} component={Overview} />
                <Route exact path={routes.default} component={Overview} />
                <Route path={routes.dashboard} component={Overview} />
                <Route path={routes.members} component={Members} />
                <Route path={routes.teams} component={Teams} />
                <Route path={routes.databases} component={Databases} />
                <Route path={routes.auditLogs} component={AuditLogs} />
                <Route path={routes.userCredentials} component={UserCredentials} />
                <Route path={routes.profile} component={Profile} />
                <Redirect to={routes.default} />
              </Switch>
            </React.Suspense>
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
    </CookiesProvider>
  );
};

export default App;
