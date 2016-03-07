var React = require('react');
var PropTypes = React.PropTypes;

var LeagueTeamStore = require('../../../stores/LeagueTeamStore');
var LeagueStore = require("../../../stores/LeagueStore");
var TeamStore = require('../../../stores/TeamStore');
var LeagueActions = require('../../../actions/LeagueActions');
var AvailabilityActions = require('../../../actions/AvailabilityActions');

var AddToComponent = require('../../navigation/AddToComponent');
var GameDatesInput = require('../../newPages/GameDatesInput');

var BasicInfoDiv = require('./BasicInfoDiv');
var MembershipsShow = require('../../navigation/MembershipsShow');

var TeamShowDetail = React.createClass({

  getInitialState: function(){

    return {
      leagues: LeagueTeamStore.leagues(this.props.item.id),
      gameDates: {
        specific: this.props.item.specificAvailabilities || [],
        general:  this.props.item.generalAvailabilities || []
      }
    };
  },

  componentDidMount: function(){
    this.leagueTeamListener = LeagueTeamStore.addListener(this.leagueTeamStoreChange);
    this.teamListener = TeamStore.addListener(this.teamChange);
  },

  componentWillUnmount: function(){
    this.leagueTeamListener.remove();
    this.teamListener.remove();

  },

  leagueTeamStoreChange: function(){
    this.setState({
      leagues: LeagueTeamStore.leagues(this.props.item.id)
    });
  },

  teamChange: function(){

    var updatedTeam = TeamStore.find(this.props.item.id);

    this.setState({
      gameDates: {
        specific: updatedTeam.specificAvailabilities || [],
        general: updatedTeam.generalAvailabilities || []
      }
    });

  },

  addToLeague: function(leagueId){
    LeagueActions.createLeagueTeam(leagueId, this.props.item.id);
  },

  removeFromLeague: function(leagueId){
    LeagueActions.destroyLeagueTeam(leagueId, this.props.item.id);
  },

  addNewGameDate: function(newGameDate){

    AvailabilityActions.attemptCreateAvailability(
      newGameDate,
      'Team',
      this.props.item.id
    );
  },

  removeGameDate: function(dateType, index){

    var gameDates = this.state.gameDates;
    var dateToRemove;

    if (dateType === 'SPECIFIC') {
      dateToRemoveId = gameDates.specific[index].id;
        } else{
      dateToRemoveId = gameDates.general[index].id;
    }

    AvailabilityActions.attemptDestroyAvailability(dateType, dateToRemoveId)
  },

  statsList: function() {

      return [{
        label: 'team name:',
        text: this.props.item.name
      },{
        label: 'contact name:',
        text: this.props.item.contactName
      },{
        label: 'email:',
        text: this.props.item.email
      },{
        label: 'phone:',
        text: this.props.item.phone
      }];

  },

  getLeaguesList: function(){
    return this.state.leagues.map(function(leagueId){
      return LeagueStore.find(leagueId);
    });
  },

  getLeaguesListHeight: function(){
    var listHeight = ((this.state.leagues.length+1) * 28);
    if (listHeight > 250) {
      return 250;
    } else if (listHeight < 115) {
      return 115;
    } else {
      return listHeight;
    }
  },

  render: function() {


    var team = this.props.item;

    var possibleLeaguesToAdd =
      LeagueStore.opposite(this.state.leagues).
      map(function(leagueId){
        return LeagueStore.find(leagueId);
      });

    //removed for mvp but ready to be returned:

    //  <GameDatesInput
    //    dates={this.state.gameDates}
    //    update={this.addNewGameDate}
    //    remove={this.removeGameDate}
    //    weeklyPlus={'Weekly game dates'}
    //    specificPlus={'Specific additions'}
    //    specificMinus={'Specific exceptions'}/>

    return (
      <div className="show-detail clear">

        <BasicInfoDiv stats={this.statsList()} />

        <MembershipsShow
          membershipName={'leagues list:'}
          itemsList={this.getLeaguesList()}
          removeItem={this.removeFromLeague}
          addItem={this.addToLeague}
          possibleItemsToAdd={possibleLeaguesToAdd}
          addMessage='Add to league'
          itemName='leagues'
          height={this.getLeaguesListHeight()} />



      </div>
    );
  }

});

module.exports = TeamShowDetail;
