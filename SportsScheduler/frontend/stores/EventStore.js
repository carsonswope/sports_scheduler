var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var EventConstants = require('../constants/EventConstants');

var _events = {};
var EventStore = new Store(AppDispatcher);

EventStore.all = function() {
  return Object.keys(_events).map(function(i){
    return _events[i];
  });
};

EventStore.find = function(id) {
  return _events[id];
};

EventStore.resetEventsList = function(events){
  _events = {};

  if (events[0]){
    events.forEach(function(event){
      _events[event.id] = event;
    });
  }

  EventStore.__emitChange();
};

EventStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case EventConstants.actions.RESET_EVENTS_LIST:
    EventStore.resetEventsList(payload.events);
    break;
  }
};

module.exports = EventStore;
