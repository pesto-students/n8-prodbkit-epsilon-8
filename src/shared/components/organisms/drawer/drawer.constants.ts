import Login from 'pages/login';
import MemberForm from 'pages/members/organisms/memberForm';
import ViewMember from 'pages/members/organisms/viewMember/ViewMember';
import Signup from 'pages/signup';

export const keyMap: Record<string, React.ReactNode> = {
  login: Login,
  signup: Signup,

  addMember: MemberForm,
  editMember: MemberForm,
  viewMember: ViewMember,
};

export const drawerNameMap: Record<string, string> = {
  login: 'Login',
  signup: 'Signup',

  viewMember: 'View Member Details',
  addMember: 'Add Member',
  editMember: 'Edit Member',

  addTeam: 'Add Team',

  addDatabase: 'Add Database',

  addCredentials: 'Add Credentials',
};

export const modalTitleMap: Record<string, string> = {
  deleteTeam: 'Delete Team',
};
