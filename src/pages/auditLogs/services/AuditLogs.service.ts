import { http } from '../../../http';

export const getAuditLogs = () => {
  return http.get('/audit-logs');
};
