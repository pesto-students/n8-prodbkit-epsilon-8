export const handleTableData = (data: any, searchText: string) => {
  if (searchText === '') {
    return data?.data;
  }
  const searchedData = data?.data.filter((row: any) => {
    return row.name.toLowerCase().includes(searchText.toLowerCase());
  });
  return searchedData;
};
