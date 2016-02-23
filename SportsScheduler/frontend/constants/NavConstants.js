
exports.tabs = {
  HOME: 'HOME',
  WEBPAGE: 'WEBPAGE',
  SCHEDULES: 'SCHEDULES',
  TEAMS: 'TEAMS',
  LEAGUES: 'LEAGUES',
  FACILITIES: 'FACILITIES'
};

exports.actions = {
  SET_TAB: 'SET_TAB',
  SET_TAB_OPTION: 'SET_TAB_OPTION'
};

var TeamsOptions = require('../components/navigation/TeamsOptions.jsx');
var LeaguesOptions = require('../components/navigation/LeaguesOptions.jsx');
var SchedulesOptions = require('../components/navigation/SchedulesOptions.jsx');
var FacilitiesOptions = require('../components/navigation/FacilitiesOptions.jsx');

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
};

var HomePage = require('../components/mainPages/HomePage');
var WebpagePage = require('../components/mainPages/WebpagePage');
var FacilitiesPage = require('../components/mainPages/FacilitiesPage');
var SchedulesPage = require('../components/mainPages/SchedulesPage');
var LeaguesPage = require('../components/mainPages/LeaguesPage');
var TeamsPage = require('../components/mainPages/TeamsPage');

exports.PAGES = {
  HOME: HomePage,
  WEBPAGE: WebpagePage,
  FACILITIES: FacilitiesPage,
  SCHEDULES: SchedulesPage,
  LEAGUES: LeaguesPage,
  TEAMS: TeamsPage
};

exports.DEFAULT_OPTIONS = {
  HOME: {},
  WEBPAGE: {},

  TEAMS: {
    nameSearch: '',
    adding: false
  },

  LEAGUES: {
    nameSearch: '',
    adding: false,
    dateStart: null,
    dateEnd: null
  },

  FACILITIES: {
    nameSearch: '',
    adding: false
  },

  SCHEDULES: {
    nameSearch: '',
    adding: false,
    dateStart: null,
    dateEnd: null,
    teamsList: 'ALL',
    leaguesList: 'ALL',
    facilitiesList: 'ALL'
  }
};

exports.OPTIONS_HEIGHT = 110;
exports.MAX_NAVBAR_TAB_HEIGHT = 40;
exports.MIN_NAVBAR_TAB_HEIGHT = 27;
exports.HEADER_HEIGHT_LOGGED_IN = 96;
exports.HEADER_HEIGHT_LOGGED_OUT = 220;
