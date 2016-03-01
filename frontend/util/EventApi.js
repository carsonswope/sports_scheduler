var EventActions = require('../actions/EventActions');

exports.fetch = function() {
  $.ajax({
    url: 'api/events',
    type: 'GET',
    dataType: 'json',
    success: function(response){
      EventActions.receiveFetch(response);
    }
  });
};

exports.attemptPatch = function(event){
  $.ajax({
    url: 'api/events/' + event.id,
    type: 'PATCH',
    dataType: 'json',
    data: {event: event},
    success: function(response){
      EventActions.receivePatchedEvent(response);
    }
  });
};

exports.attemptDestroy = function(eventId){
  $.ajax({
    url: 'api/events/' + eventId,
    type: 'DELETE',
    dataType: 'json',
    success: function(response){
      EventActions.receiveDestroyedEvent(response);
    }
  });
};

exports.attemptCreate = function(event){
  $.ajax({
    url: 'api/events',
    type: 'POST',
    dataType: 'json',
    data: {event: event},
    success: function(response){
      EventActions.receiveCreatedEvent(response)
    }
  })

};
