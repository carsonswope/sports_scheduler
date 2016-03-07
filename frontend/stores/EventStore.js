var AppDispatcher = require('../dispatcher/Dispatcher');
var Store = require('flux/utils').Store;

var TeamStore = require('../stores/TeamStore');
var LeagueStore = require('../stores/LeagueStore');
var FacilityStore = require('../stores/FacilityStore');
var DateHelper = require('../util/DateHelper')
var AvailabilityHelper = require('../util/AvailabilityHelper')

var EventConstants = require('../constants/EventConstants');
var TeamConstants = require('../constants/TeamConstants');
var FacilityConstants = require('../constants/FacilityConstants');
var LeagueConstants = require('../constants/LeagueConstants');
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
    if (EventStore.validEvent(e, filter)) {
      eventsList.push(_events[eventId]);
    }
  });

  eventsList.sort(EventHelper.eventStartSpaceship);

  return eventsList;

}

EventStore.newGameErrors = function(newGame) {
  var errors = [];
  var conflictingEventsList = [];

  //check if form completed
  if (!newGame.leagueId || newGame.leagueId === -1){
    errors.push('select a league!');

  } else if ((!newGame.team_1_id || newGame.team_1_id === -1)
          || (!newGame.team_2_id || newGame.team_2_id === -1)){
    errors.push('select teams!');

  } else if (!newGame.fieldId || newGame.fieldId === -1){
    errors.push('select a facility!');

  } else if (!newGame.date){
    errors.push('select a date!');

  } else if (!newGame.startTime){
    errors.push('select a time!');

  //if not completed, then check if the proposed game date/time
  //is conflicting with anything
  } else {

    var team1 = TeamStore.find(newGame.team_1_id);
    var team2 = TeamStore.find(newGame.team_2_id);
    var facility = FacilityStore.find(newGame.fieldId);
    var league = LeagueStore.find(newGame.leagueId);

    var eventInfo = {
      eventDate: DateHelper.dbDateFromInputString(newGame.date),
      eventStartTime: DateHelper.timeInputStringToNumber(newGame.startTime),
      eventDuration: league.gameDuration
    };

    var team_1_events = EventStore.filteredEvents({
      filterType: 'BY_TEAM', filterSpec: team1.id
    });
    var team_2_events = EventStore.filteredEvents({
      filterType: 'BY_TEAM', filterSpec: team2.id
    });
    var facilityEvents = EventStore.filteredEvents({
      filterType: 'BY_FACILITY', filterSpec: facility.id
    });


    var conflicts = {
      team1: AvailabilityHelper.conflicts(team_1_events, eventInfo, newGame.ownId),
      team2: AvailabilityHelper.conflicts(team_2_events, eventInfo, newGame.ownId),
      facility: AvailabilityHelper.conflicts(facilityEvents, eventInfo, newGame.ownId)
    }

    if (conflicts.team1.length & conflicts.team2.length) {
      errors.push(team1.name + ' and ' + team2.name + ' already are scheduled at that time');
    } else if (conflicts.team1.length){
      errors.push(team1.name + ' already are scheduled at that time');
    } else if (conflicts.team2.length){
      errors.push(team2.name + ' already are scheduled at that time');
    }

    if (conflicts.facility.length){
      errors.push(facility.name + ' is already booked at that time');
    }

    var conflictingEventsList =
      conflicts.team1.concat(conflicts.team2).
      concat(conflicts.facility).map(function(conflictingEvent){
        return conflictingEvent.id;
      });
  }

  return {
    incompleteInput: errors,
    conflicts: conflictingEventsList
  };

};

EventStore.validEvent = function(event, filter){

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

  if (parseInt(filter.filterSpec) !== -1) {
    var spec = parseInt(filter.filterSpec)
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
    } else if (filter.filterType === 'BY_FACILITY') {
      if (event.facilityId !== spec) {
        return false;
      }
    }
  }

  return true;
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

EventStore.removeEventsByTeam = function(team){

  var eventIds = Object.keys(_events);
  var idsToRemove = [];
  var event;

  for (var i = 0; i < eventIds.length; i++) {
    event = _events[eventIds[i]]
    if (event.team_1_id === team.id || event.team_2_id === team.id) {
      idsToRemove.push(eventIds[i]);
    }
  }

  for (var i = 0; i < idsToRemove.length; i++) {
    delete _events[idsToRemove[i]];
  }

  EventStore.__emitChange();
};

EventStore.removeEventsByLeague = function(league){
  var eventIds = Object.keys(_events);
  var idsToRemove = [];
  var event;

  for (var i = 0; i < eventIds.length; i++) {
    event = _events[eventIds[i]]
    if (event.leagueId === league.id) {
      idsToRemove.push(eventIds[i]);
    }
  }

  for (var i = 0; i < idsToRemove.length; i++) {
    delete _events[idsToRemove[i]];
  }

  EventStore.__emitChange();
};

EventStore.removeEventsByFacility = function(facility){
  debugger;

  var eventIds = Object.keys(_events);
  var idsToRemove = [];
  var event;

  for (var i = 0; i < eventIds.length; i++) {
    event = _events[eventIds[i]]
    if (event.facilityId === facility.id) {
      idsToRemove.push(eventIds[i]);
    }
  }

  for (var i = 0; i < idsToRemove.length; i++) {
    delete _events[idsToRemove[i]];
  }

  EventStore.__emitChange();
};

EventStore.removeEventsByLeagueTeam = function(pair){

  var eventIds = Object.keys(_events);
  var idsToRemove = [];
  var event;

  for (var i = 0; i < eventIds.length; i++) {
    event = _events[eventIds[i]]
    if ((event.team_1_id === pair.teamId || event.team_2_id === pair.teamId)
          && event.leagueId === pair.leagueId) {
      idsToRemove.push(eventIds[i]);
    }
  }

  for (var i = 0; i < idsToRemove.length; i++) {
    delete _events[idsToRemove[i]];
  }

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
    case TeamConstants.actions.REMOVE_TEAM:
      EventStore.removeEventsByTeam(payload.team);
      break;
    case LeagueConstants.actions.REMOVE_LEAGUE:
      EventStore.removeEventsByLeague(payload.league);
      break;
    case FacilityConstants.actions.REMOVE_FACILITY:
      EventStore.removeEventsByFacility(payload.facility);
      break;
    case LeagueConstants.actions.REMOVE_LEAGUE_TEAM:
      EventStore.removeEventsByLeagueTeam(payload.pair);
      break;
  }
};
//
module.exports = EventStore;
