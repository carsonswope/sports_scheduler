var AppDispatcher = require('../dispatcher/Dispatcher');
var Store = require('flux/utils').Store;
var EventConstants = require('../constants/EventConstants');

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
    if (EventStore.validEvent(eventId, filter)) {
      eventsList.push(_events[eventId]);
    }
  });

  return eventsList;
}

EventStore.validEvent = function(eventId, filter){
  var event = _events[eventId]

  // debugger;

  var eventDate = new Date(event.date);

  if (filter.startDate) {
    var startDate = new Date(filter.startDate);
    if (startDate > eventDate) {
      return false;
    }
  }

  if (filter.endDate) {
    var endDate = new Date(filter.endDate);
    endDate.setDate(endDate.getDate()+1);
    if (endDate <= eventDate) {
      return false;
    }
  }

  if (filter.filterSpec) {
    spec = parseInt(filter.filterSpec)
    if (filter.filterType === 'BY_LEAGUE') {
      if (event.leagueId !== spec) {
        return false;
      }
    } else if (filter.filterType === 'BY_TEAM') {
      if (event.team_1_id !== spec &&
          event.team_2_id !== spec)   {
        return false;
      }
    } else if (filter.filterType === 'BY_WEEKDAY') {
      if (eventDate.getDay() !== spec) {
        return false;
      }
    }
  }


  return true;
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
