export const formatFormData = (data: any): any => {
  return {
    name: data.name,
    description: data.description,
    connection_string: data.connectionString,
    cluster_id: '',
    platform: data.platform,
    environment: data.environment,
    mode: data.mode,
    status: 'active',
    created: new Date(),
    updated: new Date(),
  };
};
