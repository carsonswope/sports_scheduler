var React = require('react');
var PropTypes = React.PropTypes;
var DateHelper = require('../../util/DateHelper');
var DateConstants = require('../../constants/DateConstants');

var LeagueStore = require('../../stores/LeagueStore');
var FacilityStore = require('../../stores/FacilityStore');
var TeamStore = require('../../stores/TeamStore');

var ListViewEventShow = React.createClass({

  componentDidMount: function(){

  },

  callToggle: function(){
    this.props.toggleFocus(this.props.event.id);
  },

  detail: function(){
    if (this.props.focused){
      return(
        <div
          style={{
            position: 'relative',
            left: 53,
            width: 'calc(100% - 75)',
            borderBottom: '2px solid #16174f'
          }}> focused div </div>
      )
    }
  },

  columns: function(){
    return [{
      width: 40,
      text: DateConstants.DAYS_OF_WEEK[
            new Date(this.props.event.date).getDay()]
    },{
      width: 80,
      text: this.props.event.date
    },{
      width: 70,
      text: DateHelper.timeAsString(
            DateHelper.timeStringPrimitiveToObj(
            this.props.event.startTime))
    },{
      width: 91,
      text: LeagueStore.find(
        this.props.event.leagueId
        ).name
    },{
      width: 70,
      text: FacilityStore.find(
        this.props.event.facilityId
        ).name
    },{
      width: 220,
      text: TeamStore.find(
        this.props.event.team_1_id
      ).name
    },{
      width: 100,
      text: TeamStore.find(
        this.props.event.team_2_id
      ).name
    }];
  },

  columnElements: function(){

    var fontWeight = this.props.focused ? 700 : 400

    return this.columns().map(function(column, i){
      return(
        <div className='info-stat-text'
          key={i}
          style={{
            fontWeight: fontWeight,
            width: column.width
          }}>

          {column.text}

        </div>
      );

    }, this);
  },

  render: function() {

    var infoStatStyle = {
      left: 53,
      width: 'calc(100% - 75px)'
    };

    if (this.props.focused){
      infoStatStyle['borderBottom'] = '2px solid #16174f'
    }

    return (
      <div>

        <div className='info-stat'
          onClick={this.callToggle}
          style={infoStatStyle}>

          {this.columnElements()}

        </div>

        {this.detail()}

      </div>
    );
  }

});

module.exports = ListViewEventShow;
