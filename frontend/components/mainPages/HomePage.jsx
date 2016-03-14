var React = require('react');
var PropTypes = React.PropTypes;

var UserStore = require('../../stores/UserStore');

var HomePage = React.createClass({

  getInitialState: function(){
    return({
      user: UserStore.currentUser()
    });
  },

  componentDidMount: function() {
    this.userListener = UserStore.addListener(this.userChange);

  },

  componentWillUnmount: function() {
    this.userListener.remove();
  },

  userChange: function() {
    this.setState({ user: UserStore.currentUser() });
  },

  tourButton: function(){

    if (this.state.user.demo && this.props.tourNumber < 3){

      return(
        <div>
          Not sure where to begin?
          <div className='new-game-form-label new-game-button'
            onClick={this.props.takeTour}
            style={{
              left: 5,
              bottom: 0,
              width: 100,
              fontSize: 16,
              color: '#963019'
            }}>Take the tour</div>
          <br /><br/>
        </div>
      )



    } else {
      return null;
    }

  },

  render: function() {
    return (
      <div>
        <div className='schedule-header-main'>
          <div className='schedule-criteria-main'
            style={{width: 'calc(100% + 5px)'}}>
            <div className='schedule-criteria-title'>
              Welcome
            </div>
          </div>

        </div>
        <div className='home-page-description-main'>
          If you are the manager of a sports league, you can use this site
          to handle the scheduling process. Just create a league, fill it with teams,
          give it a field or two to play on, and then schedule games! <br /><br />

        {this.tourButton()}

          The app you are visiting now is just the schedule editor. Account holders are the only ones who
          who can access the editor. Your {this.state.user.demo ? 'guest' : ''} username is '{this.state.user.username}', so your schedules can also be accessed publically in JSON by visiting
          <a href={'/schedules/' + this.state.user.username + '?format=json'} target='_blank' className='link'> www.thesportscheduler.com/schedules/{this.state.user.username}?format=json </a><br /><br />

        If you had a league named 'coed d3', you could access that schedule by visiting
          <a href={'/schedules/' + this.state.user.username + '?format=json&league=coed d3'} target='_blank' className='link'> www.thesportschedules.com/schedules/{this.state.user.username}?format=json&league=coed d3 </a><br /><br />
          This API works with league, team, and facility criteria, which allows you to easily embed the schedules you make here into the website you already use to deliver schedules to your
          customers. <br /> <br />

        Thanks for visiting, enjoy the site!


        </div>

      </div>
    );
  }

});

module.exports = HomePage;
