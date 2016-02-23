var React = require('react');
var PropTypes = React.PropTypes;
var TeamStore = require('../../stores/TeamStore');
var NavStore = require('../../stores/NavStore');

var NewTeam = require('../newPages/NewTeam');

var TeamsPage = React.createClass({

  getInitialState: function(){
    return {
      teams: TeamStore.all(),
      options: NavStore.options('TEAMS')
    };
  },

  componentDidMount: function(){
    this.teamListener = TeamStore.addListener(this.teamChange);
    this.navListener = NavStore.addListener(this.navChange);
  },

  componentWillUnmount: function(){
    this.teamListener.remove();
    this.navListener.remove();
  },

  teamChange: function(){
    this.setState({
      teams: TeamStore.all()
    });
  },

  navChange: function(){
    this.setState({
      options: NavStore.options('TEAMS')
    });
  },

  render: function() {

    var content;

    if (this.state.options.adding) {
      content = <NewTeam />;
    } else {
      content = <div>index dix</div>;
    }

    var teams = this.state.teams.map(function(team){
      return(
        <div key={team.id}> Id: {team.id} - Name: {team.name} </div>
      );
    });

    // return (
    //   <div>
    //     {this.state.options.nameSearch}
    //     teams page
    //     {teams}
    //   </div>
    // );

    return (
      <div>{content} </div>

    );
  }

});

module.exports = TeamsPage;
