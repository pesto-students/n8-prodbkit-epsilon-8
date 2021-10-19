import memberData from 'assets/mock-data/members.json';
import teamData from 'assets/mock-data/teams.json';
import MockAdapter from 'axios-mock-adapter';

let membersList = memberData.members;
let teamsList = teamData.teams;

export const isMockEnabled = () => {
  console.log(process.env.REACT_APP_MOCK_ENABLED);
  return process.env.REACT_APP_MOCK_ENABLED === 'true';
};

export const initializeAxiosMockAdapter = (instance) => {
  const mock = new MockAdapter(instance, { delayResponse: 1000 });
  mock.onGet('/members').reply(() => getMembers());
  mock.onGet(/\/members\/\d+/).reply((config) => getMember(config));
  mock.onPost('/member').reply((config) => addMember(config));
  mock.onPut(/\/member\/\d+/).reply((config) => editMember(config));
  mock.onDelete(/\/member\/\d+/).reply((config) => removeMember(config));

  mock.onGet('/teams').reply(() => getTeams());
  mock.onGet(/\/teams\/\d+/).reply((config) => getTeam(config));
  mock.onPost('/team').reply((config) => addTeam(config));
  mock.onPut(/\/team\/\d+/).reply((config) => editTeam(config));
  mock.onDelete(/\/team\/\d+/).reply((config) => removeTeam(config));
};

export const getMembers = () => {
  return [200, membersList];
};

export const getMember = (config) => {
  const id = extractIdPathParamFromUrl(config);
  const member = membersList.find((c) => c.id === id);
  return [200, member];
};

const extractIdPathParamFromUrl = (config) => {
  return config.url.split('/').pop();
};

export const addMember = (config) => {
  const member = JSON.parse(config.data);
  membersList.unshift(member);
  // membersList.push(member);
  return [200, membersList];
};

export const editMember = (config) => {
  const id = extractIdPathParamFromUrl(config);
  const memberIndex = membersList.findIndex((c) => c.id === id);
  const member = JSON.parse(config.data);
  membersList[memberIndex] = member;
  return [200, membersList];
};

export const removeMember = (config) => {
  const id = extractIdPathParamFromUrl(config);
  membersList = membersList.filter((c) => c.id !== id);
  return [205, membersList];
};

// Teams

export const getTeams = () => {
  return [200, teamsList];
};

export const getTeam = (config) => {
  const id = extractIdPathParamFromUrl(config);
  const member = teamsList.find((c) => c.id === id);
  return [200, member];
};

export const addTeam = (config) => {
  const team = JSON.parse(config.data);
  teamsList.unshift(team);
  // membersList.push(member);
  return [200, teamsList];
};

export const editTeam = (config) => {
  const id = extractIdPathParamFromUrl(config);
  const teamIndex = teamsList.findIndex((c) => c.id === id);
  const team = JSON.parse(config.data);
  teamsList[teamIndex] = team;
  return [200, teamsList];
};

export const removeTeam = (config) => {
  const id = extractIdPathParamFromUrl(config);
  teamsList = teamsList.filter((c) => c.id !== id);
  return [204, teamsList];
};
