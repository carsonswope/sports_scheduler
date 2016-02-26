var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../../actions/NavActions');
var TeamActions = require('../../../actions/TeamActions');

var TeamShowHeader = React.createClass({

  deleteTeam: function(){
    TeamActions.attemptDestroyTeam(this.props.item.id);
  },

  render: function() {
    return (
      <div >
        {this.props.item.id} -
        {this.props.item.name}
        <div className="delete-button-on-header" style={{'float': 'right'}} onClick={this.deleteTeam}>
          delete
        </div>
      </div>
    );
  }

});

module.exports = TeamShowHeader;
