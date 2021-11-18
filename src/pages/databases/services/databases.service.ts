import ApiService from 'shared/api';

export const fetchDatabaseList = () => {
  return ApiService.get('/db');
};

export const handleDatabaseDelete = (id: string) => {
  return ApiService.delete(`/db/${id}`);
};

export const handleDatabaseSubmit = (formObject: any) => {
  return ApiService.post('/db', formObject);
};

export const handleDatabaseUpdate = (formObject: Record<string, any>) => {
  return ApiService.put(`/db/${formObject.id}`, formObject.data);
};
