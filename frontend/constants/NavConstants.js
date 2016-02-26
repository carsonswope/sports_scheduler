
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
var IndexPage = require('../components/mainPages/IndexPage');

exports.MAIN_PAGES = {
  HOME: HomePage,
  WEBPAGE: WebpagePage,
  FACILITIES: IndexPage,
  SCHEDULES: IndexPage,
  LEAGUES: IndexPage,
  TEAMS: IndexPage
};

var TeamShowDetail = require('../components/showPages/details/TeamShowDetail');
var LeagueShowDetail = require('../components/showPages/details/LeagueShowDetail');
var FacilityShowDetail = require('../components/showPages/details/FacilityShowDetail');
var ScheduleShowDetail = require('../components/showPages/details/ScheduleShowDetail.jsx');

exports.SHOW_DETAILS = {
  HOME: undefined,
  WEBPAGE: undefined,
  FACILITIES: FacilityShowDetail,
  SCHEDULES: ScheduleShowDetail,
  LEAGUES: LeagueShowDetail,
  TEAMS: TeamShowDetail
};

var TeamShowHeader = require('../components/showPages/headers/TeamShowHeader.jsx');
var LeagueShowHeader = require('../components/showPages/headers/LeagueShowHeader.jsx');
var FacilityShowHeader = require('../components/showPages/headers/FacilityShowHeader.jsx');
var ScheduleShowHeader = require('../components/showPages/headers/ScheduleShowHeader.jsx');

exports.SHOW_HEADERS = {
  HOME: undefined,
  WEBPAGE: undefined,
  FACILITIES: FacilityShowHeader,
  SCHEDULES: ScheduleShowHeader,
  LEAGUES: LeagueShowHeader,
  TEAMS: TeamShowHeader
};

var EventStore = require('../stores/EventStore');
var LeagueStore = require('../stores/LeagueStore');
var TeamStore = require('../stores/TeamStore');
var FacilityStore = require('../stores/FacilityStore');

exports.STORES = {
  SCHEDULES: EventStore,
  LEAGUES: LeagueStore,
  TEAMS: TeamStore,
  FACILITIES: FacilityStore
};

var NewLeague = require('../components/newPages/NewLeague');
var NewFacility = require('../components/newPages/NewFacility');
var NewTeam = require('../components/newPages/NewTeam');

exports.ADD_PAGES = {
  LEAGUES: NewLeague,
  TEAMS: NewTeam,
  FACILITIES: NewFacility
};

exports.DEFAULT_OPTIONS = {
  HOME: {},
  WEBPAGE: {},

  TEAMS: {
    nameSearch: '',
    adding: false,
    focused: null
  },

  LEAGUES: {
    nameSearch: '',
    adding: false,
    focused: null,
    dateStart: null,
    dateEnd: null
  },

  FACILITIES: {
    nameSearch: '',
    adding: false,
    focused: null
  },

  SCHEDULES: {
    nameSearch: '',
    adding: false,
    dateStart: null,
    dateEnd: null,
    teamsList: 'ALL',
    leaguesList: 'ALL',
    facilitiesList: 'ALL'
  },

  //options more publically accessible

  ADD_TO_LEAGUE: {
    nameSearch: ''
  }
};

var FacilityActions = require('../actions/FacilityActions');
var LeagueActions = require('../actions/LeagueActions');
var TeamActions = require('../actions/TeamActions');

exports.destroyActions = {
  FACILITIES: FacilityActions.attemptDestroyFacility,
  LEAGUES: LeagueActions.attemptDestroyLeague,
  TEAMS: TeamActions.attemptDestroyTeam,
}

exports.OPTIONS_HEIGHT = 110;
exports.MAX_NAVBAR_TAB_HEIGHT = 40;
exports.MIN_NAVBAR_TAB_HEIGHT = 27;
exports.HEADER_HEIGHT_LOGGED_IN = 96;
exports.HEADER_HEIGHT_LOGGED_OUT = 220;
