
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
  SET_TAB_OPTION: 'SET_TAB_OPTION',
  SET_TAB_OPTIONS: 'SET_TAB_OPTIONS'
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
var SchedulesPage = require('../components/mainPages/SchedulesPage');

exports.MAIN_PAGES = {
  HOME: HomePage,
  WEBPAGE: WebpagePage,
  FACILITIES: IndexPage,
  SCHEDULES: SchedulesPage,
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

var DateHelper = require('../util/DateHelper');

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
    subTab: 'LIST_VIEW',
    filter: {
      filterType: 'SHOW_ALL',
      filterSpec: 0,
      startDate: DateHelper.JSdateToInputString(new Date().setMonth(new Date().getMonth()-5)),
      endDate: DateHelper.JSdateToInputString(new Date().setMonth(new Date().getMonth()+5))
    },
    newGame: {
      leagueId: null,
      team_1_id: null,
      team_2_id: null,
      date: null,
      startTime: null,
      fieldId: null,
      errors: {
        incompleteInput: ['select a league!'],
        conficts: []
      }
    },

    focused: null
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

// exports.OPTIONS_HEIGHT = 110;
exports.MAX_NAVBAR_TAB_HEIGHT = 40;
exports.MIN_NAVBAR_TAB_HEIGHT = 27;
exports.HEADER_HEIGHT_LOGGED_IN = 106;
exports.HEADER_HEIGHT_LOGGED_OUT = 220;

exports.OPTIONS_HEIGHT = {
  HOME: 0,
  WEBPAGE: 0,
  TEAMS: 100,
  LEAGUES: 100,
  FACILITIES: 100,
  SCHEDULES: 100
};
