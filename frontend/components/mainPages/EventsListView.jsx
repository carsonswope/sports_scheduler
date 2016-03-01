var React = require('react');
var PropTypes = React.PropTypes;
var ListViewEventShow = require('../showPages/ListViewEventShow');

var EventsListView = React.createClass({

  getInitialState: function(){
    return {
      columnWidth: {
        dayOfWeek: 100,
        date: 100,
        startTime: 100,
        facilityId: 100,
        leagueId: 100,
        team_1_id: 100,
        team_2_id: 100
      },
      dragging: {
        currently: null,
        oldX: null
      }
    };
  },

  columns: function(){
    return[{
      title: 'Weekday',
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

    newState.dragging = {
      currently: null,
      oldX: null
    };

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

    return this.props.games.map(function(game, i){

      return(
        <ListViewEventShow event={game}
          key={i}
          toggleFocus={this.toggleFocus}
          focused={false}
          columns={this.columns()} />
      );

    }, this);

  },

  render: function() {

    return (
      <div style={{
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
