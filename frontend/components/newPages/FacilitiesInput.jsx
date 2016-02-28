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
        <div key={i} className='add-component-option'
          onClick={this.registerCheck.bind(this, field.id)}
          style={{width: 500}}>
          <div className='info-stat-text'
            style={{width: 265}}>
            {field.name}
          </div>
          <div className='navbar-options-clear-icon'>
            <input type='checkbox' style={{
              position: 'relative',
              bottom: 2}}
              onChange={this.registerCheck.bind(this, field.id)}
              checked={checkedBool}/>
          </div>
        </div>);

    }, this);

    return (
      <div className='show-basic-info'>
        <div className='info-stat'>
          <div className='info-stat-label'>
            Fields
          </div>
          <div className='begin-add-to-button'
            style={{display: 'inline-block'}}>
            <span onClick={this.checkAll}>Select all</span>
          </div>
        </div>

        {facilityOptions}
    </div>
    );
  }

});

module.exports = FacilitiesInput;
