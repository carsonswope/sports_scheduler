var React = require('react');
var PropTypes = React.PropTypes;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var UserActions = require('../actions/UserActions');

var UserLoginForm = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {
      username: '',
      password: ''
    };
  },

  loginClick: function(e) {
    e.preventDefault();
    UserActions.attemptLogIn(
      {
        username: this.state.username,
        password: this.state.password
      }
    );
    this.setState({password: ''});
  },

  render: function() {
    return (
      <div>
        <form onSubmit={this.loginClick}>
          <input type="text"
            valueLink={this.linkState('username')} />
          <input type="password"
            valueLink={this.linkState('password')} />
          <input type="submit" value="Log In" />
        </form>
    </div>
    );
  }

});

module.exports = UserLoginForm;
