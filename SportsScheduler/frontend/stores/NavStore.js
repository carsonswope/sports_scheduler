var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var NavConstants = require('../constants/NavConstants');

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
  _options = NavConstants.DEFAULT_OPTIONS;
};

NavStore.setTab = function(tab) {
  _currentTab = tab;
  NavStore.__emitChange();
};

NavStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case NavConstants.actions.SET_TAB:
      NavStore.setTab(payload.tab);
      break;
    case NavConstants.actions.SET_TAB_OPTION:
      NavStore.setTabOption(payload.option)
      break;
  }

};

module.exports = NavStore;
