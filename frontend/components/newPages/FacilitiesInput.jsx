var React = require('react');
var PropTypes = React.PropTypes;

var FacilityStore = require('../../stores/FacilityStore');

var LinkedStateMixin = require('react-addons-linked-state-mixin');


var FacilitiesInput = React.createClass({

  getInitialState: function(){
    return {facilityOptions: FacilityStore.all()};
  },

  registerCheck: function(facilityId){
    this.props.update(facilityId);
  },

  checkAll: function(){
    this.props.checkAll(this.state.facilityOptions.map(function(f){return f.id}));
  },


  render: function() {
    var checked;
    var facilityOptions = this.state.facilityOptions.map(function(field, i){

      checkedBool = this.props.fields.indexOf(parseInt(field.id)) !== -1;

      return(
        <div key={i}>
          <input type='checkbox' onChange={this.registerCheck.bind(this, field.id)} checked={checkedBool}/>

          {field.name}

        </div>);

    }, this);

    return (
      <div className='availability-form-main clear'>
        <div className='availability-form-tite'>Fields</div>
        <div onClick={this.checkAll}>All</div>
        {facilityOptions}
    </div>
    );
  }

});

module.exports = FacilitiesInput;
