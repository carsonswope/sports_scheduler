var React = require('react');
var PropTypes = React.PropTypes;
var LeagueStore = require('../../stores/LeagueStore');
var NavStore = require('../../stores/NavStore');
var NewLeague = require('../newPages/NewLeague');
var LeagueShow = require('../showPages/LeagueShow');

var LeaguesPage = React.createClass({

  getInitialState: function(){

    var options = NavStore.options('LEAGUES');

    return {
      leagues: LeagueStore.getMatching(options.nameSearch),
      options: options
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
      leagues: LeagueStore.getMatching(this.state.options.nameSearch)
    });
  },

  navChange: function(){

    var options = NavStore.options('LEAGUES');

    this.setState({
      options: options,
      leagues: LeagueStore.getMatching(options.nameSearch)
    });

  },

  render: function() {

    var leagues = this.state.leagues.map(function(league){
      return(
        <LeagueShow key={league.id} league={league} />
      );
    });

    var content;

    if (this.state.options.adding) {
      content = <NewLeague />;
    } else {
      content = leagues;
    }

    return ( <div> {content} </div> );
  }

});

module.exports = LeaguesPage;
