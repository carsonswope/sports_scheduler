var AppDispatcher = require('../dispatcher/dispatcher');
var NavConstants = require('../constants/NavConstants');

exports.setTab = function(tab) {

  AppDispatcher.dispatch({
    actionType: NavConstants.actions.SET_TAB,
    tab: tab
  });

};
