var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../actions/NavActions');

var NewButton = React.createClass({

  followButton: function(){
    NavActions.setTabOption(this.props.tab, 'adding', true);
  },

  render: function() {
    return (
      <div className="navbar-options-element">
        <div className="navbar-options-element-text"
          onClick={this.followButton} >
          {this.props.name}
        </div>
      </div>
    );
  }

});

module.exports = NewButton;
