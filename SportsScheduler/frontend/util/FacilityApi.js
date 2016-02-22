var FacilityActions = require('../actions/FacilityActions');

exports.fetch = function() {
  $.ajax({
    url: '/api/facilities',
    type: 'GET',
    dataType: 'json',
    success: function(response){
      FacilityActions.receiveFetch(response);
    }
  })


}
