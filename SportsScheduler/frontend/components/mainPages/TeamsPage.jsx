var React = require('react');
var PropTypes = React.PropTypes;
var TeamStore = require('../../stores/TeamStore');

var TeamsPage = React.createClass({

  getInitialState: function(){
    return {
      teams: TeamStore.all()
    };
  },

  componentDidMount: function(){
    this.teamListener = TeamStore.addListener(this.teamChange);
  },

  componentWillUnmount: function(){
    this.teamListener.remove();
  },

  teamChange: function(){
    this.setState({
      teams: TeamStore.all()
    });
  },

  render: function() {

    var teams = this.state.teams.map(function(team){
      return(
        <div key={team.id}> {team.id} </div>
      );
    });

    return (
      <div>
        teams page
        {teams}
      </div>
    );
  }

});

module.exports = TeamsPage;
