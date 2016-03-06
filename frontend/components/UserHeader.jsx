var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var UserLoginForm = require('./UserLoginForm');
var UserInfo = require('./UserInfo');

var UserStore = require('../stores/UserStore');

var UserHeader = React.createClass({

  render: function() {

    // debugger;
    var contents = (UserStore.currentUser()) ?
      <UserInfo takeTour={this.props.takeTour}
        tourNumber={this.props.tourNumber}/> : <UserLoginForm />;

    return (
      <div className="header-component header-user">
        {contents}
      </div>
    );
  }

});

module.exports = UserHeader;
