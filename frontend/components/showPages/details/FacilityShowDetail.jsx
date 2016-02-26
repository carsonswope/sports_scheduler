var React = require('react');
var PropTypes = React.PropTypes;

var AddToComponent = require('../../navigation/AddToComponent');
var LeagueStore = require('../../../stores/LeagueStore');
var LeagueFacilityStore = require('../../../stores/LeagueFacilityStore');
var LeagueActions = require('../../../actions/LeagueActions');

var FacilityShowDetail = React.createClass({


  getInitialState: function(){

    return {
      leagues: LeagueFacilityStore.leagues(this.props.item.id),
    };
  },

  componentDidMount: function(){
    this.leagueFacilityListener = LeagueFacilityStore.addListener(this.leagueFacilityStoreChange);

  },

  componentWillUnmount: function(){
    this.leagueFacilityListener.remove();
  },

  leagueFacilityStoreChange: function(){
    this.setState({
      leagues: LeagueFacilityStore.leagues(this.props.item.id)
    });
  },

  addLeague: function(leagueId){
    LeagueActions.createLeagueFacility(leagueId, this.props.item.id);
  },

  removeLeague: function(leagueId){
    LeagueActions.destroyLeagueFacility(leagueId, this.props.item.id);
  },

  render: function() {
    var facility = this.props.item;

    var leagues = this.state.leagues.map(function(leagueId){
      return LeagueStore.find(leagueId);
    });

    var leaguesList = leagues.map(function(league){
      return (
        <div key={league.id}>
          <span> {league.name} </span>
          <div onClick={this.removeLeague.bind(this, league.id)}
            className='delete-from-list-button'> X </div>
        </div>)
    }, this);

    var possibleLeaguesToAdd =
      LeagueStore.opposite(this.state.leagues).
      map(function(leagueId){
        return LeagueStore.find(leagueId);
      });

    return (
      <div className="show-detail clear">

        <div className="show-basic-info">
          <div className="info-stat">
            {facility.name}
          </div>
        </div>


        <div className="leagues-list">
          {leaguesList}
        </div>


        <div className="add-to-menu">
          <AddToComponent
            makeAdd={this.addLeague}
            list={possibleLeaguesToAdd}
            message={'Add a league'}
            item={'leagues'} />
        </div>

      </div>
    );
  }

});

module.exports = FacilityShowDetail;
