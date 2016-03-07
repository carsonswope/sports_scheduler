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
      <div key={1}
        id='header-component'
        className={this.state.user ? 'in-screen' : 'off-screen'}>
      </div>
    );

    var loggedOutHeader=(
      <div id='header-welcome-page' className={this.state.user ? 'off-screen' : 'in-screen'}>
        <div className='logo-image'/>
      </div>
    );

    if (this.state.user) {
      sizing = {
        position: 'relative',
        overflow: 'hidden',
        width: w,
        height: NavConstants.HEADER_HEIGHT_LOGGED_IN
      }

    } else {

      sizing = {
        position: 'relative',
        overflow: 'hidden',
        width: w,
        height: NavConstants.HEADER_HEIGHT_LOGGED_OUT
      }

    }

    return (
      <div id={headerId} className={headerClass}
        style={sizing} >

        <UserHeader user={this.props.user}
          takeTour={this.props.takeTour}
          tourNumber={this.props.tourNumber}/>

        {loggedInHeader}
        {loggedOutHeader}
      </div>
    );
  }

});

module.exports = Header;
