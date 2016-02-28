var React = require('react');
var PropTypes = React.PropTypes;

var AddToComponent = require('../../navigation/AddToComponent');
var LeagueStore = require('../../../stores/LeagueStore');
var LeagueFacilityStore = require('../../../stores/LeagueFacilityStore');
var LeagueActions = require('../../../actions/LeagueActions');

var BasicInfoDiv = require('./BasicInfoDiv');
var MembershipsShow = require('../../navigation/MembershipsShow');
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

  getLeaguesList: function(){
    return this.state.leagues.map(function(leagueId){
      return LeagueStore.find(leagueId);
    });
  },

  statsList: function(){
    return [{
      label: 'field name:',
      text: this.props.item.name
    }];
  },

  getLeaguesListHeight: function(){
    var listHeight = ((this.state.leagues.length+1) * 28);
    if (listHeight > 250) {
      return 350;
    } else if (listHeight < 115) {
      return 115;
    } else {
      return listHeight;
    }
  },

  render: function() {
    var facility = this.props.item;

    var possibleLeaguesToAdd =
      LeagueStore.opposite(this.state.leagues).
      map(function(leagueId){
        return LeagueStore.find(leagueId);
      });

    return (
      <div className="show-detail clear">

        <BasicInfoDiv stats={this.statsList()} />

        <MembershipsShow
          membershipName={'leagues list:'}
          itemsList={this.getLeaguesList()}
          removeItem={this.removeLeague}
          addItem={this.addLeague}
          possibleItemsToAdd={possibleLeaguesToAdd}
          addMessage='Add a league'
          itemName='leagues'
          height={this.getLeaguesListHeight()} />

      </div>
    );
  }

});

module.exports = FacilityShowDetail;
