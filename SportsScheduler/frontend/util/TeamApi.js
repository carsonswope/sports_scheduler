var TeamActions = require('../actions/TeamActions');

exports.fetch = function() {
  $.ajax({
    url: 'api/teams',
    type: 'GET',
    dateType: 'json',
    success: function(response){
      TeamActions.receiveFetch(response);
    }
  });
};
