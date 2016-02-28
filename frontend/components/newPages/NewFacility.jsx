var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../actions/NavActions');
var NewHeader = require('./NewHeader');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var FacilityActions = require('../../actions/FacilityActions');
var TextEntriesInput = require('./TextEntriesInput');

var NewFacility = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      name: ''
    };
  },

  focusEntry: function(element){
    this.refs[element].focus();
  },

  submitForm: function(e) {
    e.preventDefault();
    FacilityActions.createFacility({facility: this.state});
  },

  textFields: function(){
    return [{
      title: 'Name:',
      varName: 'name'
    }];
  },

  render: function() {
    return (
      <div className='show-item show-item-focused'>
        <NewHeader tab={'FACILITIES'} message={'Add a facility:'} />

        <form className='show-detail clear'
          style={{paddingTop: 13}}
          onSubmit={this.submitForm} >
          {TextEntriesInput.makeInputs(this, this.textFields())}

          <div className='show-item-show-item-focused'>
            <input className=""
              type="submit" value="create facility" />
          </div>
        </form>
      </div>
    );
  }

});

module.exports = NewFacility;
