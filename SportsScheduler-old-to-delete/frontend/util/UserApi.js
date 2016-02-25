var UserActions = require('../actions/UserActions');

exports.attemptLogIn = function(user) {
  $.ajax({
    url: '/api/session',
    type: 'POST',
    dataType: 'json',
    data: {user: user},
    success: function(user) {
      UserActions.logIn(user)
    }

  })
}

exports.attemptLogOut = function() {
  $.ajax({
    url: '/api/session',
    type: 'DELETE',
    dataType: 'json',
    success: function() {
      UserActions.logOut();
    }
  });
}

exports.getCurrentUser = function() {
  $.ajax({
    url: '/api/session',
    type: 'GET',
    dataType: 'json',
    success: function(user) {
      UserActions.logIn(user);
    }
  });
}
