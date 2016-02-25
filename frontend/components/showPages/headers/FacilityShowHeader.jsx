var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../../actions/NavActions');
var FacilityActions = require('../../../actions/FacilityActions');

var FacilityShowHeader = React.createClass({

  deleteFacility: function(){
    debugger;
    FacilityActions.attemptDestroyFacility(this.props.item.id);
  },

  render: function() {
    return (
      <div >
        {this.props.item.id} - {this.props.item.name}
        <div className="delete-button-on-header"
          style={{'float': 'right'}}
          onClick={this.deleteFacility}>
          delete
        </div>
      </div>
    );
  }

});

module.exports = FacilityShowHeader;
