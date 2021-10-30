import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { loginUser, logoutUser } from 'redux-features/auth';
import { routes } from 'routes';
import AntDSkeleton from 'shared/components/atoms/skeleton/Skeleton';
import Navbar from 'shared/components/organisms/navbar/Navbar';
import {
  loggedinNavList,
  loggedOutNavList,
} from 'shared/components/organisms/navbar/navbar.constants';
import { IGlobalState } from 'shared/interfaces/globalState';

const Teams = React.lazy(() => import('pages/teams'));
const Dashboard = React.lazy(() => import('pages/dashboard'));
const Members = React.lazy(() => import('pages/members'));
const Databases = React.lazy(() => import('pages/databases'));
const AuditLogs = React.lazy(() => import('pages/auditLogs'));
const UserCredentials = React.lazy(() => import('pages/userCredentials'));
const Pricing = React.lazy(() => import('pages/pricing'));
const Home = React.lazy(() => import('pages/landingPage'));

const MainApp = () => {
  const globalAuthData = useSelector((globalState: IGlobalState) => globalState.auth);
  const dispatch = useDispatch();
  const token = localStorage.getItem('jwt_token');

  useEffect(() => {
    if (!token || token.length === 0) {
      dispatch(logoutUser());
      return;
    }
    dispatch(loginUser());
  }, []);

  return (
    <>
      <header>
        <Navbar
          isUserLoggedin={globalAuthData.isUserLoggedin}
          navbarItemList={globalAuthData.isUserLoggedin ? loggedinNavList : loggedOutNavList}
        />
      </header>
      <React.Suspense fallback={<AntDSkeleton />}>
        <Switch>
          <Route exact path={routes.default} component={Home} />
          <Route path={routes.home} component={Home} />
          <Route path={routes.dashboard} component={Dashboard} />
          <Route path="/members/:id" component={Members} />
          <Route path={routes.teams} component={Teams} />
          <Route path={routes.databases} component={Databases} />
          <Route path={routes.auditLogs} component={AuditLogs} />
          <Route path={routes.userCredentials} component={UserCredentials} />
          <Route path={routes.pricing} component={Pricing} />
          <Redirect to={routes.default} />
        </Switch>
      </React.Suspense>
    </>
  );
};

export default MainApp;
