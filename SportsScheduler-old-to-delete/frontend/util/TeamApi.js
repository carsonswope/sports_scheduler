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

  var teamParams = {
    name:         team.team.name,
    contact_name: team.team.contactName,
    email:        team.team.email,
    phone:        team.team.phone
  };

  $.ajax({
    url: 'api/teams',
    type: 'POST',
    dataType: 'json',
    data: {team: teamParams},
    success: function(response){
      TeamActions.receiveCreateResponse(response);
    }
  });
};
