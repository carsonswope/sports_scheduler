var FacilityActions = require('../actions/FacilityActions');

exports.fetch = function() {
  $.ajax({
    url: '/api/facilities',
    type: 'GET',
    dataType: 'json',
    success: function(response){
      FacilityActions.receiveFetch(response);
    }
  });

};

exports.attemptCreateFacility = function(facility) {

  var facilityParams = {
    name: facility.facility.name
  };

  $.ajax({
    url: 'api/facilities',
    type: 'POST',
    dataType: 'json',
    data: {facility: facilityParams},
    success: function(response){
      FacilityActions.receiveCreateResponse(response);
    }
  });

};
