import { routes } from 'routes';
import { UserAuthType } from 'shared/interfaces/globalState';

export interface INavbarItem {
  name: string;
  url: string;
  roles?: UserAuthType[];
}

export const loggedinNavList: INavbarItem[] = [
  {
    name: 'Dashboard',
    url: routes.dashboard,
  },
  {
    name: 'Teams',
    url: routes.teams,
  },
  {
    name: 'Databases',
    url: routes.databases,
  },
  {
    name: 'Audit Logs',
    url: routes.auditLogs,
  },
  {
    name: 'User credentials',
    url: routes.userCredentials,
  },
];

export const loggedOutNavList: INavbarItem[] = [
  {
    name: 'Home',
    url: routes.home,
  },
  {
    name: 'Pricing',
    url: routes.pricing,
  },
  // {
  //   name: 'Contact us',
  //   url: routes.contactUs,
  // },
];
