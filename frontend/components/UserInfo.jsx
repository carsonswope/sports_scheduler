var React = require('react');

var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');

var UserInfo = React.createClass({

  initiateLogout: function() {
    UserActions.attemptLogOut();
  },

  tourButton: function(){
    if (UserStore.currentUser().demo && this.props.tourNumber < 3){
      return(
        <div className='info-stat'
          style={{width: '100%', position: 'relative', right: 0}}>
          <div className='new-game-form-label new-game-button'
            style={{left: 21}}
            onClick={this.props.takeTour}>
            take a tour!
          </div>
        </div>
      );
    } else {
      return null;
    }

  },

  componentWillReceiveProps: function(newProps) {

  },

  render: function() {
    return (
      <div>
        <div className='info-stat'
          style={{width: '100%', position: 'relative', right: 0}}>
          <div className='info-stat-label'
            style={{width: 75}}>
            logged in as
          </div>
          <div className='info-stat-text'>
            {UserStore.currentUser().username}
          </div>

        </div>
        <div className='info-stat'
          style={{width: '100%', position: 'relative', right: 0}}>
          <div className='new-game-form-label new-game-button'
            style={{color: '#963019', left: 21}}
            onClick={this.initiateLogout}>
            log out
          </div>
        </div>

        {this.tourButton()}

      </div>
    );
  }

});

module.exports = UserInfo;
