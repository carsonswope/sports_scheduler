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

exports.attemptCreateLeague = function(league) {

  var leagueParams = {
    name: league.league.name
  };

  $.ajax({
    url: 'api/leagues',
    type: 'POST',
    dataType: 'json',
    data: {league: leagueParams},
    success: function(response){
      LeagueActions.receiveCreateResponse(response);
    }
  });
};
