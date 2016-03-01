var React = require('react');
var PropTypes = React.PropTypes;
var ScheduleCriteria = require('../showPages/ScheduleCriteria');
var EventStore = require('../../stores/EventStore');
var NavStore = require('../../stores/NavStore');

var EventsListView = require('./EventsListView');
var ListViewEventShow = require('../showPages/ListViewEventShow');
var CalendarViewEventShow = require('../showPages/CalendarViewEventShow');

var NewGameForm = require('../newPages/NewGameForm');

var SchedulesPage = React.createClass({

  getInitialState: function(){

    var filter = NavStore.options('SCHEDULES').filter

    // debugger;

    return({
      viewType: NavStore.options('SCHEDULES').subTab,
      filter: filter,
      games: EventStore.filteredEvents(filter),
      selected: null
    });
  },

  componentDidMount: function(){
    this.navListener = NavStore.addListener(this.navChange);
    this.eventListener = EventStore.addListener(this.eventChange);
  },

  componentWillUnmount: function(){
    this.navListener.remove();
    this.eventListener.remove();
  },

  navChange: function(){

    var options = NavStore.options('SCHEDULES');
    var filter = options.filter;

    this.setState({
      viewType: options.subTab,
      filter: filter,
      games: EventStore.filteredEvents(filter)
    });
  },

  eventChange: function(){

    this.setState({
      games: EventStore.filteredEvents(this.state.filter),
      focused: null
    })
  },

  toggleFocus: function(id){
    if (this.state.focused === id) {
      this.setState({focused: null});
    } else {
      this.setState({focused: id});
    }
  },

  gamesList: function(){
    // var games = [{id: 1}, {id: 2}];

    if (this.state.viewType === 'LIST_VIEW'){
      return <EventsListView games={this.state.games} dims={{width: 800, height: 300}}/>
    } else {

    }

    return this.state.games.map(function(game){
      if (this.state.viewType === 'LIST_VIEW'){

        return <ListViewEventShow event={game}
          key={game.id}
          toggleFocus={this.toggleFocus}
          focused={this.state.focused === game.id}/>

      } else {

        return <CalendarViewEventShow event={game} />

      }
    }, this)
  },

  getNewGameForm: function(){
    this.setState({
      adding: true
    });
  },

  hideNewGameForm: function(){
    this.setState({
      adding: false
    });
  },

  newGameForm: function(){
    if (this.state.adding) {
      return <NewGameForm cancelAdding={this.hideNewGameForm}/>;
    } else {
      return(
        <div className='info-stat'
          style={{width: 'calc(100% - 75px)', height: 42, left: 53}}>
          <div className='gamedate-input-button gamedate-input-submit-button'
            style={{left: 50, bottom: -22}}
            onClick={this.getNewGameForm}>
            schedule a game!
          </div>
        </div>
      );
    }
  },

  render: function() {
    return (
      <div>
        <ScheduleCriteria />
        <div style={{
            width: this.props.dims.width,
            height: this.props.dims.height,
            overflowY: 'scroll',
            overflowX: 'hidden'
          }}>

          {this.gamesList()}
          {this.newGameForm()}

        </div>
      </div>
    );
  }

});

module.exports = SchedulesPage;
