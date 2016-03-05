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

exports.loginDemoAccount = function(){
  $.ajax({
    url: '/api/users?demo=true',
    type: 'POST',
    dataType: 'json',
    success: function(user) {
      UserActions.logIn(user);
    }
  });

}

exports.createAccount = function(user){
  $.ajax({
    url: '/api/users?demo=false',
    type: 'POST',
    dataType: 'json',
    data: {user: user},
    success: function(user) {
      UserActions.logIn(user);
    }
  });

}
