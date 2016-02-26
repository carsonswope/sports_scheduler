var AvailabilityActions = require('../actions/AvailabilityActions');

exports.attemptDestroy = function(availType, id){
  $.ajax({
    url: 'api/availability',
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

  debugger;

  $.ajax({


  });
};
