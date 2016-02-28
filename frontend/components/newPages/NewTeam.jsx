var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../actions/NavActions');
var NewHeader = require('./NewHeader');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var TeamActions = require('../../actions/TeamActions');
var GameDatesInput = require('./GameDatesInput');
var TextEntriesInput = require('./TextEntriesInput');

var NewTeam = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      name: '',
      contactName: '',
      email: '',
      phone: '',
      gameDates: {
        general: [],
        specific: []
      }
    };
  },

  submitForm: function(e) {
    e.preventDefault();
    TeamActions.createTeam({team: this.state});
  },

  updateGameDatesInput: function(newGameDate){
    var gameDates = this.state.gameDates;

    if (newGameDate.availType === 'SPECIFIC') {
      gameDates.specific.push(newGameDate);
    } else {
      gameDates.general.push(newGameDate);
    }
    this.setState({gameDates: gameDates});

  },

  removeGameDates: function(dateType, index){
    var gameDates = this.state.gameDates;

    if (dateType === 'SPECIFIC') {
      gameDates.specific.splice(index, 1);
        } else{
      gameDates.general.splice(index, 1);
    }

    this.setState({gameDates: gameDates});

  },

  focusEntry: function(element){
    this.refs[element].focus();
  },

  textFields: function(){
    return [{
      title: 'Name:',
      varName: 'name',
    },{
      title: 'Contact name:',
      varName: 'contactName'
    },{
      title: 'Phone:',
      varName: 'phone',
    },{
      title: 'Email:',
      varName: 'email'
    }];

  },

  render: function() {
    return (
      <div className='show-item show-item-focused'>
        <NewHeader tab={'TEAMS'} message={'Add a team:'} />

        <form className='show-detail clear'
          style={{paddingTop: 13}}
          onSubmit={this.submitForm} >

          {TextEntriesInput.makeInputs(this, this.textFields())}

          <GameDatesInput
            dates={this.state.gameDates}
            update={this.updateGameDatesInput}
            remove={this.removeGameDates}
            weeklyPlus={'Weekly game dates'}
            specificPlus={'Specific additions'}
            specificMinus={'Specific exceptions'}/>

          <input className="new-submit-button"
            type="submit" value="create team" />
        </form>
      </div>
    );
  }

});

module.exports = NewTeam;
