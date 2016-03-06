var AppDispatcher = require('../dispatcher/Dispatcher');
var Store = require('flux/utils').Store;
var FlashConstants = require('../constants/FlashConstants');

var FlashStore = new Store(AppDispatcher);

var _flashes = [];

// one flash looks like:
// {
//   category: 'USERS',
//   message: 'username is already taken...'
// }

FlashStore.currentFlash = function() {
  return _flashes[_flashes.length-1];
};

FlashStore.addFlash = function(flash) {

  _flashes.push(flash);
  FlashStore.__emitChange();

}

FlashStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case FlashConstants.actions.ADD_FLASH:
      FlashStore.addFlash(payload.flash);
      break;
  }
};

module.exports = FlashStore;
