import moment from 'moment';

export const formatFormData = (data: any): any => {
  return {
    id: '12',
    name: data.name,
    email: data.email,
    username: data.username,
    createdAt: moment(new Date()).format('DD MMM YYYY'),
    updatedAt: moment(new Date()).format('DD MMM YYYY'),
    role: data.role,
  };
};
