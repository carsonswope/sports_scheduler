var AppDispatcher = require('../dispatcher/Dispatcher');
var UserApi = require('../util/UserApi');
var UserConstants = require('../constants/UserConstants');
var FlashConstants = require('../constants/FlashConstants');

var _waiting = false;

exports.attemptLogIn = function(params) {
  if (!_waiting) {
    UserApi.attemptLogIn(params);
    _waiting = true;
  }
}

exports.logIn = function(user) {
  _waiting = false;
  AppDispatcher.dispatch({
    actionType: UserConstants.LOG_IN_USER,
    user: user
  });
}

exports.attemptLogOut = function() {
  if (!_waiting) {
    UserApi.attemptLogOut();
  }
}

exports.logOut = function() {
  _waiting = false;
  AppDispatcher.dispatch({
    actionType: UserConstants.LOG_OUT_USER
  });
}

exports.getCurrentUser = function() {
  UserApi.getCurrentUser();
}

exports.loginDemoAccount = function() {
  if (!_waiting) {
    UserApi.loginDemoAccount();
    _waiting = true;
  }
}

exports.handleFailedLogin = function(response) {
  _waiting = false;
  AppDispatcher.dispatch({
    actionType: FlashConstants.actions.ADD_FLASH,
    flash: {
      category: 'USERS',
      message: response.responseJSON
    }
  });
}

exports.handleFailedCreation = function(response) {
  _waiting = false;
  AppDispatcher.dispatch({
    actionType: FlashConstants.actions.ADD_FLASH,
    flash: {
      category: 'USERS',
      message: response.responseJSON
    }
  });
}

exports.createAccount = function(user){
  if (!_waiting) {
    UserApi.createAccount(user);
    _waiting = true;
  }

}
