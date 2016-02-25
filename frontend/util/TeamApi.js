var TeamActions = require('../actions/TeamActions');

// TeamApi

exports.fetch = function() {
  $.ajax({
    url: 'api/teams',
    type: 'GET',
    dataType: 'json',
    success: function(response){
      TeamActions.receiveFetch(response);
    }
  });
};

exports.attemptCreateTeam = function(team) {

  $.ajax({
    url: 'api/teams',
    type: 'POST',
    dataType: 'json',
    data: {team: team},
    success: function(response){
      TeamActions.receiveCreateResponse(response);
    }
  });
};

exports.attemptDestroy = function(id) {
  $.ajax({
    url: 'api/teams/' + id,
    type: 'DELETE',
    dataType: 'json',
    success: function(response){
      TeamActions.receiveDestroyedTeam(response);
    }
  });
};
