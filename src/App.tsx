import { Layout } from 'antd';
import cn from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import styles from './app.module.scss';
import { routes } from './routes';
import Loader from './shared/components/atoms/loader/Loader';
import AntDDrawer from './shared/components/organisms/drawer/Drawer';
import AntDModal from './shared/components/organisms/modal/Modal';
import Navbar from './shared/components/organisms/navbar/Navbar';
import {
  loggedinNavList,
  loggedOutNavList,
} from './shared/components/organisms/navbar/navbar.constants';
import { IGlobalState } from './shared/interfaces/globalState';

const Teams = React.lazy(() => import('./pages/teams'));
const Overview = React.lazy(() => import('./pages/dashboard'));
const Members = React.lazy(() => import('./pages/members'));
const Databases = React.lazy(() => import('./pages/databases'));
const AuditLogs = React.lazy(() => import('./pages/auditLogs'));
const UserCredentials = React.lazy(() => import('./pages/userCredentials'));
const Profile = React.lazy(() => import('./pages/profile'));

const App: React.FC = () => {
  // add interface for state object
  // const [token, setToken] = useState(null);
  const globalAuthData = useSelector((globalState: IGlobalState) => globalState.auth);

  return (
    <>
      <Layout>
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
            <div className={cn(styles.footerWrapper, styles.positionBottom)}>Ninja8 project</div>
          </footer>
          <AntDDrawer />
          <AntDModal />
        </div>
      </Layout>
    </>
  );
};

export default App;
