var React = require('react');
var PropTypes = React.PropTypes;
var NavStore = require('../../stores/NavStore');
var TeamStore = require('../../stores/TeamStore');
var LeagueStore = require('../../stores/LeagueStore');
var EventStore = require('../../stores/EventStore');


var ScheduleCriteria = React.createClass({

  getInitialState: function(){
    return{
      criteria: NavStore.options('SCHEDULES'),
    };
  },

  render: function() {

    return (
      <div className='show-item show-item-focused'
        style={{
          marginTop: '-44'
        }}>
        <div className='show-option show-option-focused'>
          <div className='show-item-header'>
            <div className='navbar-option'>
              <div className='navbar-tab-title navbar-tab-title-selected'>
                Schedules:
              </div>
            </div>

          </div>
          <div className='show-detail clear'
            style={{height: 40}}>
            ss
          </div>
        </div>
      </div>
    );
  }

});

module.exports = ScheduleCriteria;
