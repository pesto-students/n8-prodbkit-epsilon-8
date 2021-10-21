import moment from 'moment';
import { IMemberPostData, IMemberPutData } from 'pages/members/member.interface';

export const formatFormPostData = (data: any): any => {
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

export const formatFormPutData = (data: any): any => {
  return {
    id: '12',
    name: data.name,
    email: data.email,
    username: data.username,
    updatedAt: moment(new Date()).format('DD MMM YYYY'),
    role: data.role,
  };
};
