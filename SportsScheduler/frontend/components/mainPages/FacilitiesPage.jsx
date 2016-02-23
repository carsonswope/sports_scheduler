var React = require('react');
var PropTypes = React.PropTypes;
var FacilityStore = require('../../stores/FacilityStore');

var NavStore = require('../../stores/NavStore');

var FacilitiesPage = React.createClass({

  getInitialState: function(){
    return {
      facilitys: FacilityStore.all(),
      options: NavStore.options('FACILITIES')
    };
  },

  componentDidMount: function(){
    this.facilityListener = FacilityStore.addListener(this.facilityChange);
    this.navListener = NavStore.addListener(this.navChange);
  },

  componentWillUnmount: function(){
    this.facilityListener.remove();
    this.navListener.remove();
  },

  facilityChange: function(){
    this.setState({
      facilitys: FacilityStore.all()
    });
  },

  navChange: function(){
    this.setState({
      options: NavStore.options('FACILITIES')
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
        {this.state.options.nameSearch}
        facilities page
        {facilities}
      </div>
    );
  }

});

module.exports = FacilitiesPage;
