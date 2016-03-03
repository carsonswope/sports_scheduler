var AvailabilityActions = require('../actions/AvailabilityActions');

exports.attemptDestroy = function(availType, id){
  $.ajax({
    url: 'api/availabilities/' + id,
    method: 'DELETE',
    dataType: 'json',
    data: {
      availability: {
        availType: availType,
        id: id
      }
    },
    success: function(response){
      AvailabilityActions.receiveDestroyedAvailability(response);
    }

  });
};

exports.attemptCreate = function(date){

  $.ajax({
    url: 'api/availabilities',
    method: 'POST',
    dataType: 'json',
    data: { date },
    success: function(response){
      AvailabilityActions.receiveCreatedAvailability(response);
    }


  });
};

exports.fetchAvailableDates = function(resourceId, resourceType){

  $.ajax({
    url: 'api/availabilities/' + resourceId.toString() + '?resource=' + resourceType,
    method: 'GET',
    dataType: 'json',
    success: function(response){
      AvailabilityActions.receiveAvailabilityFetch(response);
    }
  })


};
