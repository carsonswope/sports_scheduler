var React = require('react');
var PropTypes = React.PropTypes;
var FacilityStore = require('../../stores/FacilityStore');
var NewFacility = require('../newPages/NewFacility');
var FacilityShow = require('../showPages/FacilityShow');

var NavStore = require('../../stores/NavStore');

var FacilitiesPage = React.createClass({

  getInitialState: function(){

    var options = NavStore.options('FACILITIES');

    return {
      facilities: FacilityStore.getMatching(options.nameSearch),
      options: options
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
      facilities: FacilityStore.getMatching(this.state.options.nameSearch)
    });
  },

  navChange: function(){

    var options = NavStore.options('FACILITIES');

    this.setState({
      facilities: FacilityStore.getMatching(options.nameSearch),
      options: options
    })
  },

  render: function() {

    var facilities = this.state.facilities.map(function(facility){
      return(
        <FacilityShow key={facility.id} facility={facility} />
      );
    });

    var content;

    if (this.state.options.adding) {
      content = <NewFacility />;
    } else {
      content = facilities
    }

    return ( <div> {content} </div> );
  }

});

module.exports = FacilitiesPage;
