var React = require('react');
var PropTypes = React.PropTypes;

var EventStore = require('../../stores/EventStore');

var SchedulesPage = React.createClass({

  getInitialState: function(){
    return {
      events: EventStore.all()
    };
  },

  componentDidMount: function(){
    this.eventListener = EventStore.addListener(this.eventChange);
  },

  componentWillUnmount: function(){
    this.eventListener.remove();
  },

  eventChange: function(){
    this.setState({
      events: EventStore.all()
    });
  },

  render: function() {

    var events = this.state.events.map(function(event){
      return(
        <div key={event.id}> {event.id} </div>
      );
    });

    return (
      <div>
        schedule page
        {events}
      </div>
    );
  }

});

module.exports = SchedulesPage;
