var AppDispatcher = require('../dispatcher/Dispatcher');
var Store = require('flux/utils').Store;

var DateHelper = require('../util/DateHelper');
var NavConstants = require('../constants/NavConstants');
var UserConstants = require('../constants/UserConstants');
var TeamConstants = require('../constants/TeamConstants');
var LeagueConstants = require('../constants/LeagueConstants');
var FacilityConstants = require('../constants/FacilityConstants');

var NavStore = new Store(AppDispatcher);


var _currentTab = NavConstants.tabs.HOME;
var _options = NavConstants.DEFAULT_OPTIONS;

NavStore.currentTab = function() {
  return _currentTab;
};

NavStore.options = function(tab){
  if ( !_options ) { _options = NavConstants.DEFAULT_OPTIONS; }
  return _options[tab];
};

NavStore.setTabOption = function(option){
  _options[option.tab][option.category] = option.newValue;
  NavStore.__emitChange();
};

NavStore.reset = function() {
  _currentTab = NavConstants.tabs.HOME;

  _options.HOME = {};

  _options.TEAMS = {
    nameSearch: '',
    adding: false,
    focused: null
  };
  _options.LEAGUES = {
    nameSearch: '',
    adding: false,
    focused: null
  };

  _options.FACILITIES = {
    nameSearch: '',
    adding: false,
    focused: null
  };

  _options.SCHEDULES = {
    nameSearch: '',
    adding: false,
    subTab: 'LIST_VIEW',
    filter: {
      filterType: 'SHOW_ALL',
      filterSpec: 0,
      startDate: DateHelper.JSdateToInputString(new Date().setMonth(new Date().getMonth()-8)),
      endDate: DateHelper.JSdateToInputString(new Date().setMonth(new Date().getMonth()+8))
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
  };

  NavStore.__emitChange();
};

NavStore.setTab = function(tab) {

  if (!_options) { _options = NavConstants.DEFAULT_OPTIONS; }

  if (_currentTab !== tab){
    _options[tab]['nameSearch'] = '';
    _options[tab]['adding'] = false;

    _currentTab = tab;
    NavStore.__emitChange();

  }
};

NavStore.setTabOptions = function(values){

  var value;
  for (var i = 0; i < values.length; i++) {
    value = values[i];
    _options[value.tab][value.category] = value.newValue;
  }

  NavStore.__emitChange();

};

NavStore.setFocusOnElement = function(tab, element) {
  _currentTab = tab;
  _options[tab].adding = false;
  _options[tab].nameSearch = element.name;
  // _options[tab].focused = element.id
  NavStore.__emitChange();
};

NavStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case NavConstants.actions.SET_TAB:
      NavStore.setTab(payload.tab);
      break;
    case NavConstants.actions.SET_TAB_OPTION:
      NavStore.setTabOption(payload.option);
      break;
    case NavConstants.actions.SET_TAB_OPTIONS:
      NavStore.setTabOptions(payload.values);
      break;
    case TeamConstants.actions.ADD_TEAM:
      NavStore.setFocusOnElement('TEAMS', payload.team);
      break;
    case LeagueConstants.actions.ADD_LEAGUE:
      NavStore.setFocusOnElement('LEAGUES', payload.league);
      break;
    case FacilityConstants.actions.ADD_FACILITY:
      NavStore.setFocusOnElement('FACILITIES', payload.facility);
      break;
    case UserConstants.LOG_OUT_USER:
      NavStore.reset();
      break;
  }

};

module.exports = NavStore;
