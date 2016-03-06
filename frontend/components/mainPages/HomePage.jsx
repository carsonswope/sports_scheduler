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
              Hello!
            </div>

          </div>
          home page
        </div>

      </div>
    );
  }

});

module.exports = HomePage;
