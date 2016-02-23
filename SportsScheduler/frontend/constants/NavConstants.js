var TeamsOptions = require('../components/navigation/TeamsOptions.jsx');

exports.tabs = {
  HOME: 'HOME',
  WEBPAGE: 'WEBPAGE',
  TEAMS: 'TEAMS',
  LEAGUES: 'LEAGUES',
  FACILITIES: 'FACILITIES',
  SCHEDULES: 'SCHEDULES'
};

exports.actions = {
  SET_TAB: 'SET_TAB'
};

exports.TAB_OPTIONS = {
  HOME: undefined,
  WEBPAGE: undefined,
  TEAMS: TeamsOptions,
  LEAGUES: undefined,
  FACILITIES: undefined,
  SCHEDULES: undefined
};

exports.SCREEN_NAMES = {
  HOME: 'Home',
  WEBPAGE: 'Webpage',
  TEAMS: 'Teams',
  LEAGUES: 'Leagues',
  FACILITIES: 'Facilities',
  SCHEDULES: 'Schedules'
}
