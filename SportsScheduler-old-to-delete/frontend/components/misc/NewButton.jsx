var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../actions/NavActions');

var NewButton = React.createClass({

  followButton: function(){
    NavActions.setTabOption(this.props.tab, 'adding', true);
  },

  render: function() {
    return (
      <div className="navbar-options-new-button"
        onClick={this.followButton} >
        {this.props.name}
      </div>
    );
  }

});

module.exports = NewButton;
