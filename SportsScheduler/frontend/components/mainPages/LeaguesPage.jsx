var React = require('react');
var PropTypes = React.PropTypes;
var LeagueStore = require('../../stores/LeagueStore');
var NavStore = require('../../stores/NavStore');

var LeaguesPage = React.createClass({

  getInitialState: function(){
    return {
      leagues: LeagueStore.all(),
      options: NavStore.options('LEAGUES')
    };
  },

  componentDidMount: function(){
    this.leagueListener = LeagueStore.addListener(this.leagueChange);
    this.navListener = NavStore.addListener(this.navChange);
  },

  componentWillUnmount: function(){
    this.leagueListener.remove();
    this.navListener.remove();
  },

  leagueChange: function(){
    this.setState({
      leagues: LeagueStore.all()
    });
  },

  navChange: function(){
    this.setState({
      options: NavStore.options('LEAGUES')
    });
  },

  render: function() {

    var leagues = this.state.leagues.map(function(league){
      return(
        <div key={league.id}> id: {league.id} name: {league.name} </div>
      );
    });

    return (
      <div>
        {this.state.options.nameSearch}
        leaguesPage
        {leagues}
      </div>
    );
  }

});

module.exports = LeaguesPage;
