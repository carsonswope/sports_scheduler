var React = require('react');

var UserHeader = require('./UserHeader');
var UserStore = require('../stores/UserStore');
var NavConstants = require('../constants/NavConstants');

var Header = React.createClass({

  getInitialState: function(){
    return {
      user: UserStore.currentUser()
    };
  },
  componentDidMount: function(){
    this.userListener = UserStore.addListener(this.userChange);
    this.setState({user: UserStore.currentUser()});
  },

  componentWillUnmount: function(){
    this.userListener.remove();
  },

  userChange: function(){
    this.setState({user: UserStore.currentUser()});
  },


  render: function() {

    var w = this.props.dims.width-280;
    var sizing;
    var middleElement;

    var headerId = 'header-main-id'

    var headerClass = this.state.user ? 'header-main' : 'header-main-logged-out'

    var loggedInHeader=(
      <div id='header-component' className={this.state.user ? 'in-screen' : 'off-screen'}>
        user company name / logo here
      </div>
    );

    var loggedOutHeader=(
      <div id='header-welcome-page' className={this.state.user ? 'off-screen' : 'in-screen'}>
        <h1>
          Welcome to the Sports Scheduler
        </h1>
      </div>
    );

    if (this.state.user) {
      sizing = {
        position: 'relative',
        overflow: 'hidden',
        width: w,
        height: NavConstants.HEADER_HEIGHT_LOGGED_IN
      }
      middleElement =(


        <div className="header-component header-center">
          user company name / logo here
        </div>

      );
    } else {

      sizing = {
        position: 'relative',
        overflow: 'hidden',
        width: w,
        height: NavConstants.HEADER_HEIGHT_LOGGED_OUT
      }

      middleElement =(
        <div className="header-welcome-page">
          <h1>Welcome to the Sports Scheduler

          </h1>
        </div>
      );
    }

    return (
      <div id={headerId} className={headerClass}
        style={sizing} >

        <UserHeader user={this.props.user}/>

        {loggedInHeader}
        {loggedOutHeader}
      </div>
    );
  }

});

module.exports = Header;
