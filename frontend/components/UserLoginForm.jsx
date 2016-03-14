var React = require('react');
var PropTypes = React.PropTypes;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var UserActions = require('../actions/UserActions');

var FlashStore = require('../stores/FlashStore');
var FlashMessage = require('../components/misc/FlashMessage.jsx');

var UserLoginForm = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {
      username: '',
      password: '',
      flash: null
    };
  },

  componentDidMount: function() {
    this.flashListener = FlashStore.addListener(this.flashChange);
  },

  componentWillUnmount: function() {
    this.flashListener.remove();
  },

  flashChange: function() {
    var flash = FlashStore.currentFlash();
    if (flash.category === 'USERS') {
      this.setState({flash: flash.message});
    }
  },

  flash: function() {
    if (this.state.flash) {
      return <FlashMessage time={1000} message={this.state.flash[0]}/>;
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
    this.setState({ flash: null, password: '' });

  },

  demoLoginClick: function(e) {
    e.preventDefault();
    this.setState({ flash: null });
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
    this.setState({ flash: null, password: '' });

  },

  setFocus: function(ref) {
    this.refs[ref].focus();
  },

  render: function() {
    return (
      <div>
        <form onSubmit={this.loginClick}>
          <div className='info-stat'
            onClick={this.setFocus.bind(this, 'usernameField')}
            style={{width: '100%', position: 'relative', right: 0, marginTop: 4}}>
            <div className='info-stat-label'
              style={{width: 80}}>
              username:
            </div>
            <input type='text' className='info-stat-text text-entry-box'
              ref='usernameField'
              style={{width: 148, position: 'relative', bottom: -5}}
              valueLink={this.linkState('username')} />
          </div>

          <div className='info-stat'
            onClick={this.setFocus.bind(this, 'passwordField')}
            style={{width: '100%', position: 'relative', right: 0}}>
            <div className='info-stat-label'
              style={{width: 80}}>
              password:
            </div>
            <input type='password' className='info-stat-text text-entry-box'
              ref='passwordField'
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

          {this.flash()}

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
