export const getURL = (endpoint: string) => {
  return `${process.env.REACT_APP_BASE_URL}${endpoint}`;
};

export const getUrlById = (endpoint: string, id?: string) => {
  return `${process.env.REACT_APP_BASE_URL}${endpoint}/${id}`;
};
