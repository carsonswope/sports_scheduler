var AppDispatcher = require('../dispatcher/Dispatcher');
var EventApi = require('../util/EventApi');
var EventConstants = require('../constants/EventConstants');

// EventActions

exports.fetch = function() {
  EventApi.fetch();
};

exports.receiveFetch = function(events) {

  AppDispatcher.dispatch({
    actionType: EventConstants.actions.RESET_EVENTS_LIST,
    events: events
  });
};
