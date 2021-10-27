import databaseForm from 'pages/databases/organisms/databaseForm';
import Login from 'pages/login';
import MemberForm from 'pages/members/organisms/memberForm';
import Signup from 'pages/signup';
import teamForm from 'pages/teams/organisms/teamForm';

export const keyMap: Record<string, React.ReactNode> = {
  login: Login,
  signup: Signup,

  addMember: MemberForm,
  editMember: MemberForm,
  viewMember: MemberForm,

  addTeam: teamForm,
  viewTeam: teamForm,
  editTeam: teamForm,

  // addTeam:

  addDatabase: databaseForm,
  viewDatabase: databaseForm,
  editDatabase: databaseForm,
};

export const drawerNameMap: Record<string, string> = {
  login: 'Login',
  signup: 'Signup',

  viewMember: 'View Member Details',
  addMember: 'Add Member',
  editMember: 'Edit Member',

  addTeam: 'Add Team',
  editTeam: 'Edit Team',
  viewTeam: 'View Team Details',

  addDatabase: 'Add Database',
  viewDatabase: 'View Database details',
  editDatabase: 'Edit Database details',

  addCredentials: 'Add Credentials',
};

export const modalTitleMap: Record<string, string> = {
  deleteTeam: 'Delete Team',
};
