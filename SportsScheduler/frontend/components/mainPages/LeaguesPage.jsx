var React = require('react');
var PropTypes = React.PropTypes;
var LeagueStore = require('../../stores/LeagueStore');

var LeaguesPage = React.createClass({

  getInitialState: function(){
    return {
      leagues: LeagueStore.all()
    };
  },

  componentDidMount: function(){
    this.leagueListener = LeagueStore.addListener(this.leagueChange);
  },

  componentWillUnmount: function(){
    this.leagueListener.remove();
  },

  leagueChange: function(){
    this.setState({
      leagues: LeagueStore.all()
    });
  },

  render: function() {

    var leagues = this.state.leagues.map(function(league){
      return(
        <div key={league.id}> {league.id} </div>
      );
    });

    return (
      <div>
        leaguesPage
        {leagues}
      </div>
    );
  }

});

module.exports = LeaguesPage;
