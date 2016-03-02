var AppDispatcher = require('../dispatcher/Dispatcher');
var NavConstants = require('../constants/NavConstants');

exports.setTab = function(tab) {
  AppDispatcher.dispatch({
    actionType: NavConstants.actions.SET_TAB,
    tab: tab
  });
};

exports.setTabOption = function(tab, category, newValue) {
  AppDispatcher.dispatch({
    actionType: NavConstants.actions.SET_TAB_OPTION,
    option: {
      tab: tab,
      category: category,
      newValue: newValue
    }
  });
};

exports.setTabOptions = function(newValues){
  debugger;


  AppDispatcher.dispatch({
    actionType: NavConstants.actions.SET_TAB_OPTIONS,
    values: newValues
  });
}
