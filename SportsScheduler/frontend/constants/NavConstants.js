var TeamsOptions = require('../components/navigation/TeamsOptions.jsx');
var LeaguesOptions = require('../components/navigation/LeaguesOptions.jsx');
var SchedulesOptions = require('../components/navigation/SchedulesOptions.jsx');
var FacilitiesOptions = require('../components/navigation/FacilitiesOptions.jsx');


exports.tabs = {
  HOME: 'HOME',
  WEBPAGE: 'WEBPAGE',
  SCHEDULES: 'SCHEDULES',
  TEAMS: 'TEAMS',
  LEAGUES: 'LEAGUES',
  FACILITIES: 'FACILITIES'
};

exports.actions = {
  SET_TAB: 'SET_TAB'
};

exports.TAB_OPTIONS = {
  HOME: undefined,
  WEBPAGE: undefined,
  TEAMS: TeamsOptions,
  LEAGUES: LeaguesOptions,
  FACILITIES: FacilitiesOptions,
  SCHEDULES: SchedulesOptions
};

exports.SCREEN_NAMES = {
  HOME: 'Home',
  WEBPAGE: 'Webpage',
  TEAMS: 'Teams',
  LEAGUES: 'Leagues',
  FACILITIES: 'Facilities',
  SCHEDULES: 'Schedules'
}

exports.DEFAULT_OPTIONS = {
  HOME: {


  },

  WEBPAGE: {


  },

  TEAMS: {
    teamsList: 'ALL',
    nameSearch: '',
    adding: false
  },

  LEAGUES: {
    leaguesList: 'ALL',
    nameSearch: '',
    adding: false,
    dateStart: null,
    dateEnd: null
  },

  FACILITIES: {
    facilitiesList: 'ALL',
    nameSearch: '',
    adding: false
  },

  SCHEDULES: {
    eventsList: 'ALL',
    nameSearch: '',
    adding: false,
    dateStart: null,
    dateEnd: null,
    teamsList: 'ALL',
    leaguesList: 'ALL',
    facilitiesList: 'ALL'
  }
}
