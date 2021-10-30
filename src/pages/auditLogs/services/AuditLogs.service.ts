import axios from 'axios';
import { getURL } from 'shared/utils/api';

import { http } from '../../../http';

export const fetchAuditLogsList = () => {
  return axios.get(getURL('/audit-logs'), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
      'Content-Type': 'application/json',
    },
  });
};
