var React = require('react');
var PropTypes = React.PropTypes;
var TeamStore = require('../../stores/TeamStore');
var NavStore = require('../../stores/NavStore');

var TeamShow = require('../showPages/TeamShow');
var NewTeam = require('../newPages/NewTeam');

var TeamsPage = React.createClass({

  getInitialState: function(){

    var options = NavStore.options('TEAMS');

    return {
      teams: TeamStore.getMatching(options.nameSearch),
      options: options
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
      teams: TeamStore.getMatching(this.state.options.nameSearch)
    });
  },

  navChange: function(){
    this.setState({
      options: NavStore.options('TEAMS')
    });
    this.setState({
      teams: TeamStore.getMatching(this.state.options.nameSearch)
    });
  },

  render: function() {

    var teams = this.state.teams.map(function(team){
      return(
        <TeamShow key={team.id} team={team} />
      );
    });

    var content;

    if (this.state.options.adding) {
      content = <NewTeam />;
    } else {
      content = teams;
    }

    return (
      <div>{content} </div>
    );
  }

});

module.exports = TeamsPage;
