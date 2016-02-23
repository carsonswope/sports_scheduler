var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../actions/NavActions');
var NewHeader = require('./NewHeader');
var LinkedStateMixin = require('react-addons-linked-state-mixin');


var NewTeam = React.createClass({

  mixins: [LinkedStateMixin],

  render: function() {
    return (
      <div>
        <NewHeader tab={'TEAMS'} title={'Add a team:'} />
      </div>
    );
  }

});

module.exports = NewTeam;
