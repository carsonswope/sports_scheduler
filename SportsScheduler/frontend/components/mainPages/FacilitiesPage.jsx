var React = require('react');
var PropTypes = React.PropTypes;
var FacilityStore = require('../../stores/FacilityStore');

var FacilitiesPage = React.createClass({

  getInitialState: function(){
    return {
      facilitys: FacilityStore.all()
    };
  },

  componentDidMount: function(){
    this.facilityListener = FacilityStore.addListener(this.facilityChange);
  },

  componentWillUnmount: function(){
    this.facilityListener.remove();
  },

  facilityChange: function(){
    this.setState({
      facilitys: FacilityStore.all()
    });
  },

  render: function() {

    var facilities = this.state.facilitys.map(function(facility){
      return(
        <div key={facility.id}> {facility.name} </div>
      );
    });

    return (
      <div>
        facilities page
        {facilities}
      </div>
    );
  }

});

module.exports = FacilitiesPage;
