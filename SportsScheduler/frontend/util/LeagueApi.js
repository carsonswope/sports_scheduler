var LeagueActions = require('../actions/LeagueActions');

exports.fetch = function() {
  $.ajax({
    url: 'api/leagues',
    type: 'GET',
    dateType: 'json',
    success: function(response){
      LeagueActions.receiveFetch(response);
    }
  });
};
