var React = require('react');
var DayView = require('./DayView');
var Calendar = require('./Calendar');

var FacilityStore = require('../stores/FacilityStore.js')
var FacilityActions = require('../actions/FacilityActions.js')

var viewInfo = {

  date: new Date(),
  startTime: {
    hrs: 18,
    mns: 25
  },
  endTime: {
    hrs: 22,
    mns: 40
  },

  facilities: [
    { id: 1,
      name: 'east field',
      events: [
        {
          id: 10,
          description: 'game 1',
          startTime: {
            hrs: 18, mns: 25
          },
          endTime: {
            hrs: 19, mns: 15
          }
        },
        {
          id: 12,
          description: 'game 4',
          startTime: {
            hrs: 19, mns: 15
          },
          endTime: {
            hrs: 20, mns: 5
          }
        },
        {
          id: 12,
          description: 'game 5',
          startTime: {
            hrs: 20, mns: 5
          },
          endTime: {
            hrs: 20, mns: 55
          }
        },
        {
          id: 12,
          description: 'game 5',
          startTime: {
            hrs: 20, mns: 55
          },
          endTime: {
            hrs: 21, mns: 50
          }
        }
      ]
    },{
      id: 2,
      name: 'west field',
      events: [
        {
          id: 14,
          description: 'game3',
          startTime: {
            hrs: 21, mns: 50
          },
          endTime: {
            hrs: 22, mns: 40
          }
        },{
          id: 14,
          description: 'game3',
          startTime: {
            hrs: 19, mns: 15
          },
          endTime: {
            hrs: 20, mns: 5
          }
        }
      ]
    },{
      id: 3,
      name: '3v3 field',
      events: [
        {
          id: 14,
          description: 'game3',
          startTime: {
            hrs: 20, mns: 55
          },
          endTime: {
            hrs: 21, mns: 50
          }
        }
      ]
    }
  ]
}

var App = React.createClass({

  getInitialState: function() {
    return {
      facilities: FacilityStore.all()
    }
  },

  componentDidMount: function() {
    this.facilityListener = FacilityStore.addListener(
      this.facilityChange
    );
    FacilityActions.fetch();
  },

  facilityChange: function() {
    this.setState({
      facilities: FacilityStore.all()
    });

    this.forceUpdate();
  },

  render: function() {
    return (
      <div>
        <Calendar facilities={this.state.facilities}/>
      </div>
    );
  }

});

module.exports = App;
