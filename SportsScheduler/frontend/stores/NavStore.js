var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var NavConstants = require('../constants/NavConstants');

var NavStore = new Store(AppDispatcher);

var _currentTab = NavConstants.tabs.HOME;

var _options = NavConstants.DEFAULT_OPTIONS;

NavStore.currentTab = function() {
  return _currentTab;
}

NavStore.setTab = function(tab) {
    _currentTab = tab;
  NavStore.__emitChange();
}

NavStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case NavConstants.actions.SET_TAB:
      NavStore.setTab(payload.tab);
      break;
    default:

  }

}


module.exports = NavStore;
