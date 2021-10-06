import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import cn from 'classnames';

import Navbar, { INavbarItem } from './shared/components/organisms/navbar/Navbar';
import Loader from './shared/components/molecules/loader/Loader';
import CustomDrawer from './shared/components/organisms/drawer/Drawer';

import styles from './app.module.scss';

const Teams = React.lazy(() => import('./pages/teams'));
const Overview = React.lazy(() => import('./pages/dashboard'));
const Members = React.lazy(() => import('./pages/members'));
const Databases = React.lazy(() => import('./pages/databases'));
const AuditLogs = React.lazy(() => import('./pages/auditLogs'));
const UserCredentials = React.lazy(() => import('./pages/userCredentials'));

const navList: INavbarItem[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
  },
  {
    name: 'Members',
    url: '/members',
  },
  {
    name: 'Teams',
    url: '/teams',
  },
  {
    name: 'Databases',
    url: '/databases',
  },
  {
    name: 'Audit Logs',
    url: '/audit-logs',
  },
  {
    name: 'User credentials',
    url: '/user-credentials',
  },
];

const App: React.FC = () => {
  // add interface for state object
  // const [token, setToken] = useState(null);

  return (
    <>
      <Layout>
        <div className={styles.App}>
          <BrowserRouter>
            <header>
              <Navbar isUserLoggedin={false} navbarItemList={navList} />
            </header>
            <React.Suspense fallback={<Loader />}>
              <Switch>
                <Route exact path="/" component={Overview} />
                <Route path="/dashboard" component={Overview} />
                <Route path="/members" component={Members} />
                <Route path="/teams" component={Teams} />
                <Route path="/databases" component={Databases} />
                <Route path="/audit-logs" component={AuditLogs} />
                <Route path="/user-credentials" component={UserCredentials} />
                <Redirect to="/" />
              </Switch>
            </React.Suspense>
          </BrowserRouter>
          <footer>
            <div className={cn(styles.footerWrapper, styles.positionBottom)}>Ninja8 project</div>
          </footer>
          <CustomDrawer />
        </div>
      </Layout>
    </>
  );
};

export default App;
