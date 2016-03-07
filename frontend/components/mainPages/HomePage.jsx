var React = require('react');
var PropTypes = React.PropTypes;


var HomePage = React.createClass({

  //this.props.startTour

  render: function() {
    return (
      <div>
        <div className='schedule-header-main'>
          <div className='schedule-criteria-main'
            style={{width: 'calc(100% + 20px)'}}>
            <div className='schedule-criteria-title'>
              Welcome
            </div>
          </div>

        </div>
        <div className='home-page-description-main'>
          This is the Sport Scheduler.
        </div>

      </div>
    );
  }

});

module.exports = HomePage;
