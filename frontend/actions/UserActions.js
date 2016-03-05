var AppDispatcher = require('../dispatcher/Dispatcher');
var UserApi = require('../util/UserApi');
var UserConstants = require('../constants/UserConstants');

exports.attemptLogIn = function(params) {
  UserApi.attemptLogIn(params);
}

exports.logIn = function(user) {
  AppDispatcher.dispatch({
    actionType: UserConstants.LOG_IN_USER,
    user: user
  });
}

exports.attemptLogOut = function() {
  UserApi.attemptLogOut();
}

exports.logOut = function() {
  AppDispatcher.dispatch({
    actionType: UserConstants.LOG_OUT_USER
  });
}

exports.getCurrentUser = function() {
  UserApi.getCurrentUser();
}

exports.loginDemoAccount = function() {
  UserApi.loginDemoAccount();
}

exports.createAccount = function(user){
  UserApi.createAccount(user);
}
