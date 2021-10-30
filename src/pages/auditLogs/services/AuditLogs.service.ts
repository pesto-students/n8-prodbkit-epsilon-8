import ApiService from 'shared/api';

export const fetchAuditLogsList = () => {
  return ApiService.get('/audit-log');
};
