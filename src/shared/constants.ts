import Login from '../pages/login';
import Signup from '../pages/signup';

export const keyMap: Record<string, React.ReactNode> = {
  login: Login,
  signup: Signup,
};

export const drawerNameMap: Record<string, string> = {
  login: 'Login',
  signup: 'Signup',
};
