var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var UserLoginForm = require('./UserLoginForm');
var UserInfo = require('./UserInfo');

var UserStore = require('../stores/UserStore');

var UserHeader = React.createClass({

  render: function() {

    var contents = (this.props.user) ?
      <UserInfo /> : <UserLoginForm />;

    return (
      <div className="header-component header-user">
        {contents}
      </div>
    );
  }

});

module.exports = UserHeader;
