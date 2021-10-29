export const formatFormData = (data: any): any => {
  return [
    {
      name: data.name,
      email: data.email,
      role: data.role,
    },
  ];
};
