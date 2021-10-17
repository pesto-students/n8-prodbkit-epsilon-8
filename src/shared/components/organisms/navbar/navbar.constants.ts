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
    roles: ['team_lead'],
  },
  {
    name: 'Members',
    url: routes.members,
    roles: ['admin'],
  },
  {
    name: 'Teams',
    url: routes.teams,
    roles: ['admin'],
  },
  {
    name: 'Databases',
    url: routes.databases,
    roles: ['admin'],
  },
  {
    name: 'Audit Logs',
    url: routes.auditLogs,
    roles: ['admin'],
  },
  {
    name: 'User credentials',
    url: routes.userCredentials,
    roles: ['admin'],
  },
];

export const loggedOutNavList: INavbarItem[] = [
  {
    name: 'Home',
    url: routes.home,
    roles: ['admin'],
  },
  {
    name: 'About us',
    url: routes.aboutUs,
    roles: ['admin'],
  },
  {
    name: 'Contact us',
    url: routes.contactUs,
    roles: ['admin'],
  },
];
