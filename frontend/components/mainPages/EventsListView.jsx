var React = require('react');
var PropTypes = React.PropTypes;
var NavStore = require('../../stores/NavStore');

var ListViewEventShow = require('../showPages/ListViewEventShow');

var EventsListView = React.createClass({

  getInitialState: function(){
    return {
      columnWidth: {
        dayOfWeek: 50,
        date: 105,
        startTime: 80,
        facilityId: 80,
        leagueId: 100,
        team_1_id: 130,
        team_2_id: 130
      },

      dragging: {
        currently: null,
        oldX: null
      },

      newGameInfo: NavStore.options('SCHEDULES').newGame,

      focused: null

    };
  },

  componentDidMount: function(){
    this.navListener = NavStore.addListener(this.navChange);
  },

  componentWillUnmount: function(){
    this.navListener.remove();
  },

  navChange: function(){
    var newGameInfo = NavStore.options('SCHEDULES').newGame;

    this.setState({
      newGameInfo: newGameInfo
    });
  },

  removeFocus: function(){
    this.setState({focused: null})
  },

  toggleFocus: function(eventId){
    if (this.state.focused === eventId){
      this.setState({focused: null});
    } else {
      this.setState({focused: eventId});
    }
  },

  columns: function(){
    return[{
      title: 'Day',
      varName: 'dayOfWeek',
      width: this.state.columnWidth.dayOfWeek
    },{
      title: 'Date',
      varName: 'date',
      width: this.state.columnWidth.date
    },{
      title: 'Time',
      varName: 'startTime',
      width: this.state.columnWidth.startTime
    },{
      title: 'Field',
      varName: 'facilityId',
      width: this.state.columnWidth.facilityId
    },{
      title: 'League',
      varName: 'leagueId',
      width: this.state.columnWidth.leagueId
    },{
      title: 'Home Team',
      varName: 'team_1_id',
      width: this.state.columnWidth.team_1_id
    },{
      title: 'Away Team',
      varName: 'team_2_id',
      width: this.state.columnWidth.team_2_id
    }];
  },

  startDragging: function(varName, e){
    this.setState({
      dragging: {
        currently: varName,
        oldX: e.clientX
      }
    })
  },

  stopDragging: function(){
    var newState = this.state
    if (this.state.dragging.currently) {
      if (newState.columnWidth[this.state.dragging.currently] < 10) {
        newState.columnWidth[this.state.dragging.currently] = 10;
      }
    }

    newState.dragging = { currently: null, oldX: null };

    this.setState({ newState});
  },

  drag: function(e){
    if (this.state.dragging.currently) {

      var newState = this.state
      var dX = e.clientX - this.state.dragging.oldX;
      var newWidth = dX + this.state.columnWidth[this.state.dragging.currently];

      newState.columnWidth[this.state.dragging.currently] = newWidth;
      newState.dragging['oldX'] = e.clientX;
      this.setState({ newState });
    }
  },

  headerElement: function(){

    var cols = this.columns().map(function(column, i){

      //padding-left: 10px
      //draggable: 6px (2 body, 4 invisible border)
      //displayWidth: width-16

      return[
        <div key={i}
          className='table-header-text'
          style={{width: column.width - 16}}>
          {column.title}
        </div>,
        <div key={-(i+1)}
          onMouseDown={this.startDragging.bind(this, column.varName)}
          className='table-header-draggable' />
      ];
    }, this);

    return(
      <div className='table-header-main'
        style={{width: this.props.dims.width - 76}}
        onMouseMove={this.drag}
        onMouseLeave={this.stopDragging}
        onMouseUp={this.stopDragging}>
        <div style={{width: 20, display: 'inline-block'}} />
        <div className='table-header-draggable' />
        {cols}
      </div>
    )

  },

  tableEntries: function(){

    // var conflicts = this.state.newGameInfo.errors.conflicts;


    return this.props.games.map(function(game, i){

      var classes={
        header: this.state.focused === game.id ? 'table-entry-header-focused' : 'table-entry-header'
      };

      var conflicts = this.state.newGameInfo.errors.conflicts;

      classes.text = conflicts && conflicts.indexOf(game.id) > -1 ?
        'table-entry-text-flagged' : 'table-entry-text'

      return(
        <ListViewEventShow event={game}
          classInfo={classes}
          width={this.props.dims.width - 76}
          key={game.id}
          toggleFocus={this.toggleFocus}
          removeFocus={this.removeFocus}
          focused={this.state.focused === game.id}
          columns={this.columns()} />
      );
    }, this);
  },

  render: function() {

    return (
      <div style={{
          left: 20,
          position: 'relative',
          marginTop: 16,
          width: this.props.dims.width,
          height: this.props.dims.height
        }}>

        {this.headerElement()}

        <div className='table-body-main'>

          {this.tableEntries()}

        </div>
      </div>
    );
  }

});

module.exports = EventsListView;
