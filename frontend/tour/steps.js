var NavActions = require('../actions/NavActions');
var LeagueStore = require('../stores/LeagueStore');
var TeamStore = require('../stores/TeamStore');
var FacilityStore = require('../stores/FacilityStore');
var LeagueTeamStore = require('../stores/LeagueTeamStore');

exports.steps = [{
  title: 'Welcome to the Sports Scheduler',
  text: 'sfhj',
  number: 1,
  selector: '.logo-bar',
  position: 'right',
  type: 'hover'
},{
  title: 'Leagues',
  text: 'create leagues and fill them with teams',
  number: 2,
  selector: '.logo-bar',
  position: 'right',
  type: 'hover'
},{
  title: 'look at this league',
  text: 'dosoa',
  number: 3,
  selector: '.logo-bar',
  position: 'right',
  type: 'hover'
},{
  title: 'schedule games',
  text: 'jkl',
  number: 4,
  selector: '.logo-bar',
  position: 'right',
  type: 'hover'
},{
  title: 'schedule games',
  text: 'jkl',
  number: 5,
  selector: '.logo-bar',
  position: 'right',
  type: 'hover'
},{
  title: 'schedule games',
  text: 'jkl',
  number: 6,
  selector: '.logo-bar',
  position: 'right',
  type: 'hover'
}];

exports.stepActions = {
  1: NavActions.setTab.bind(this, 'HOME'),
  2: NavActions.setTab.bind(this, 'LEAGUES'),
  3: NavActions.setTabOption.bind(this, 'LEAGUES', 'nameSearch', 'mens d2'),
  4: NavActions.setTab.bind(this, 'SCHEDULES'),
  5: NavActions.setTabOption.bind(this, 'SCHEDULES', 'adding', true)
}
