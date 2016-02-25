var React = require('react');

var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var UserInfo = React.createClass({

  initiateLogout: function() {
    UserActions.attemptLogOut();
  },

  render: function() {
    return (
      <div>
        logged in as {UserStore.currentUser().username}
        <input type="submit"
          value="log out" onClick={this.initiateLogout} />
      </div>
    );
  }

});

module.exports = UserInfo;
