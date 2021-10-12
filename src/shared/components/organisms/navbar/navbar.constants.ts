import { routes } from '../../../../routes';
import { UserAuthType } from '../../../interfaces/globalState';

export interface INavbarItem {
  name: string;
  url: string;
  roles?: UserAuthType[];
}

export const loggedinNavList: INavbarItem[] = [
  {
    name: 'Dashboard',
    url: routes.dashboard,
    roles: ['admin'],
  },
  {
    name: 'Members',
    url: routes.members,
    roles: ['all'],
  },
  {
    name: 'Teams',
    url: routes.teams,
    roles: ['admin', 'manager'],
  },
  {
    name: 'Databases',
    url: routes.databases,
    roles: ['manager'],
  },
  {
    name: 'Audit Logs',
    url: routes.auditLogs,
    roles: ['member'],
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
    roles: ['all'],
  },
  {
    name: 'About us',
    url: routes.aboutUs,
    roles: ['all'],
  },
  {
    name: 'Contact us',
    url: routes.contactUs,
    roles: ['all'],
  },
];
