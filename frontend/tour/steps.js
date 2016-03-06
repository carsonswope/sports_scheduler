var NavActions = require('../actions/NavActions');
var EventActions = require('../actions/EventActions');

var LeagueStore = require('../stores/LeagueStore');
var EventStore = require('../stores/EventStore');
var NavStore = require('../stores/NavStore');
var TeamStore = require('../stores/TeamStore');
var FacilityStore = require('../stores/FacilityStore');
var LeagueTeamStore = require('../stores/LeagueTeamStore');

var DateHelper = require('../util/DateHelper');

var _games = [{
  team_1_index: 2,
  team_2_index: 4,
  field_index: 0,
  date: '2016-06-15',
  time: '19:15'
},{
  team_1_index: 0,
  team_2_index: 5,
  field_index: 1,
  date: '2016-06-15',
  time: '19:15'
},{
  team_1_index: 1,
  team_2_index: 3,
  field_index: 0,
  date: '2016-06-15',
  time: '20:05'
}];

exports.steps = [{
  title: 'Welcome to the Sports Scheduler',
  text: "The Sports Scheduler is your all-in-one tool for scheduling sports leagues",
  selector: '#editor',
  position: 'right',
  preAction: NavActions.setTab.bind(this, 'HOME')
},{
  title: 'Leagues',
  text: 'To show you how it works, I\'ve assembled a league consisting of 6 teams.',
  selector: '#editor',
  position: 'right',
  preAction: NavActions.setTab.bind(this, 'LEAGUES')
},{
  title: 'Leagues',
  text: 'If you scroll down, you\'ll see that the league will have games on "east" and "west" fields, and the game dates will be on Wednesdays between Jun 10th and Aug 15th.',
  selector: '#editor',
  position: 'right',
  preAction: function(){}
},{
  title: 'Schedules',
  text: 'I\'ve also scheduled a few of the league\'s games already. A good start, but right now the teams only are getting 5 games each instead of 8',
  selector: '#editor',
  position: 'right',
  preAction: NavActions.setTab.bind(this, 'SCHEDULES')
},{
  title: 'Schedule a game',
  text: 'Let\'s add another game to the schedule! We will start by selecting a league' ,
  selector: '#editor',
  position: 'right',
  preAction: NavActions.setTabOption.bind(this, 'SCHEDULES', 'adding', true)
},{
  title: 'Schedule a game',
  text: 'And next we will select the teams and a field to play on',
  selector: '#editor',
  position: 'right',
  preAction: function(info){
      var newGame = NavStore.options('SCHEDULES').newGame;
      newGame.leagueId = info.league.id;
      newGame.errors = EventStore.newGameErrors(newGame);
      NavActions.setTabOption('SCHEDULES', 'newGame', newGame); }
},{
  title: 'Schedule a game',
  text: 'Oh man, that\'s a pretty good matchup. But when should it be? We can look for a gap in the schedule visually when we go to Calendar View',
  selector: '#editor',
  position: 'right',
  preAction: function(info, tourNumber){

      var t1 = _games[tourNumber].team_1_index;
      var t2 = _games[tourNumber].team_2_index;
      var f = _games[tourNumber].field_index;

      var newGame = NavStore.options('SCHEDULES').newGame;
      newGame.team_1_id = info.teams[t1];
      newGame.team_2_id = info.teams[t2];
      newGame.fieldId = info.facilities[f];
      newGame.errors = EventStore.newGameErrors(newGame);
      NavActions.setTabOption('SCHEDULES', 'newGame', newGame); }
},{
  title: 'Schedule a game',
  text: 'A little better, but if we change the schedule filter to \'By League\' and then select our league, we can see an overlay of the league\'s typical game dates',
  selector: '#editor',
  position: 'right',
  preAction: NavActions.setTabOption.bind(this, 'SCHEDULES', 'subTab', 'CALENDAR_VIEW')
},{
  title: 'Schedule a game',
  text: 'Oh look! The league\'s first game date has no games. Let\'s schedule the game for then.',
  selector: '#editor',
  position: 'right',
  preAction: function(info){

      var filter = NavStore.options('SCHEDULES').filter;

      filter.filterType = 'BY_LEAGUE';
      filter.filterSpec = info.league.id;

      NavActions.setTabOption('SCHEDULES', 'filter', filter); }
},{
  title: 'Schedule a game',
  text: 'Everything seems in order, let\'s schedule it then!...',
  selector: '#editor',
  position: 'right',
  preAction: function(info, tourNumber){

      var date = _games[tourNumber].date;
      var time = _games[tourNumber].time;

      var newGame = NavStore.options('SCHEDULES').newGame;
      newGame.date = date;
      newGame.startTime = time;
      newGame.errors = EventStore.newGameErrors(newGame);
      NavActions.setTabOption('SCHEDULES', 'newGame', newGame); }
},{
  title: 'Schedule a game',
  text: 'And there it is! Thus concludes the tour. Thanks for visiting, hope you decide to use The Sport Scheduler for all your league-management needs!',
  selector: '#editor',
  position: 'right',
  preAction: function(info){

      var newGame = NavStore.options('SCHEDULES').newGame;

      var event = {
        date: DateHelper.dbDateFromInputString(newGame.date),
        facility_id: newGame.fieldId,
        league_id: newGame.leagueId,
        team_1_id: newGame.team_1_id,
        team_2_id: newGame.team_2_id,
        start_time: DateHelper.timeInputStringToNumber(newGame.startTime),
        duration: LeagueStore.find(newGame.leagueId).gameDuration
      }

      newGame = {
        team_1_id: -1,
        team_2_id: -1,
        fieldId: -1,
        errors: {
          incompleteInput: ['select teams!'],
          conflicts: []
        }
      };

      NavActions.setTabOption('SCHEDULES', 'newGame', newGame);
      EventActions.attemptCreate(event); }
}];
