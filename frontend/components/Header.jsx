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
    var estilo;
    var middleElement;

    if (this.state.user) {
      estilo = {
        width: w,
        height: NavConstants.HEADER_HEIGHT_LOGGED_IN
      }
      middleElement =(


        <div className="header-component header-center">
          user company name / logo here
        </div>

      );
    } else {
      estilo = {
        width: w,
        height: NavConstants.HEADER_HEIGHT_LOGGED_OUT
      }
      middleElement =(
        <div className="header-welcome-page">
          <h1>Welcome to the Sports Scheduler</h1>

        </div>
      );
    }


    return (
      <div className="header-main"
        style={estilo} >

        <UserHeader user={this.props.user}/>

        {middleElement}
      </div>
    );
  }

});

module.exports = Header;
