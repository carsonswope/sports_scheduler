var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../../actions/NavActions');
var LeagueActions = require('../../../actions/LeagueActions');

var LeagueShowHeader = React.createClass({

  deleteLeague: function(){
    LeagueActions.attemptDestroyLeague(this.props.item.id);
  },

  render: function() {
    return (
      <div >
        {this.props.item.id} - {this.props.item.name}
        <div className="delete-button-on-header"
          style={{'float': 'right'}}
          onClick={this.deleteLeague}>
          delete
        </div>
      </div>
    );
  }

});

module.exports = LeagueShowHeader;
