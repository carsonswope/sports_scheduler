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

  demoLoginClick: function(e) {
    e.preventDefault();
    UserActions.loginDemoAccount();
  },

  signUpClick: function(e) {
    e.preventDefault();
    UserActions.createAccount(
      {
        username: this.state.username,
        password: this.state.password
      }
    );
    this.setState({password: ''})
  },

  render: function() {
    return (
      <div>
        <form onSubmit={this.loginClick}>
          <div className='info-stat'
            style={{width: '100%', position: 'relative', right: 0, marginTop: 4}}>
            <div className='info-stat-label'
              style={{width: 80}}>
              username:
            </div>
            <input type='text' className='info-stat-text text-entry-box'
              style={{width: 148, position: 'relative', bottom: -5}}
              valueLink={this.linkState('username')} />
          </div>

          <div className='info-stat'
            style={{width: '100%', position: 'relative', right: 0}}>
            <div className='info-stat-label'
              style={{width: 80}}>
              password:
            </div>
            <input type='password' className='info-stat-text text-entry-box'
              style={{width: 148, position: 'relative', bottom: -5}}
              valueLink={this.linkState('password')} />
          </div>

          <div className='info-stat'
            style={{width: '100%', position: 'relative', right: 0}}>
            <input type='submit' className='new-game-form-label new-game-button'
              style={{outline: 'none', border: 0, position: 'relative', left: -5}} value='log in' />
            <div className='new-game-form-label new-game-button'
              onClick={this.signUpClick}>
              sign up
            </div>
          </div>

          <div className='info-stat'
            style={{width: '100%', position: 'relative', right: 0, height: 108}}>
            <div className='new-game-form-label new-game-button'
              onClick={this.demoLoginClick}
              style={{top: 88, width: 220}}>
              new? sign in with a demo account
            </div>
          </div>
        </form>

      </div>
    );
  }

});

module.exports = UserLoginForm;
