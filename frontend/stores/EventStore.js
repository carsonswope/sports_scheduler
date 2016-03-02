var AppDispatcher = require('../dispatcher/Dispatcher');
var Store = require('flux/utils').Store;
var EventConstants = require('../constants/EventConstants');
var EventHelper = require('../util/EventHelper');


var _events = {};
var EventStore = new Store(AppDispatcher);

EventStore.all = function() {
  return Object.keys(_events).map(function(i){
    return _events[i];
  });
};

EventStore.filteredEvents = function(filter) {
  //
  var eventsList = []

  Object.keys(_events).forEach(function(eventId){
    var e = EventStore.find(eventId)
    if (EventHelper.validEvent(e, filter)) {
      eventsList.push(_events[eventId]);
    }
  });

  eventsList.sort(EventHelper.eventStartSpaceship);

  return eventsList;

}

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

EventStore.updateEvent = function(event){
  _events[event.id] = event;
  EventStore.__emitChange();
};

EventStore.deleteEvent = function(event){

  delete _events[event.id];
  EventStore.__emitChange();
};

EventStore.addEvent = function(event){

  _events[event.id] = event;

  EventStore.__emitChange();
};

EventStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case EventConstants.actions.RESET_EVENTS_LIST:
      EventStore.resetEventsList(payload.events);
      break;
    case EventConstants.actions.UPDATE_EVENT:
      EventStore.updateEvent(payload.event);
      break;
    case EventConstants.actions.DELETE_EVENT:
      EventStore.deleteEvent(payload.event);
      break;
    case EventConstants.actions.ADD_EVENT:
      EventStore.addEvent(payload.event);
      break;
  }
};

module.exports = EventStore;
