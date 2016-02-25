var EventActions = require('../actions/EventActions');

exports.fetch = function() {
  $.ajax({
    url: 'api/events',
    type: 'GET',
    dateType: 'json',
    success: function(response){
      EventActions.receiveFetch(response);
    }
  });
};
