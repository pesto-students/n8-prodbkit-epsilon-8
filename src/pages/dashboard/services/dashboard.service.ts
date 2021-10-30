import ApiService from 'shared/api';

export const fetchDashboardStats = () => {
  return ApiService.get('/auth/dashboard-stats');
};
