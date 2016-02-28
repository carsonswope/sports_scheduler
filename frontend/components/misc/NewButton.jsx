var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../actions/NavActions');

var NewButton = React.createClass({

  followButton: function(){
    if (this.props.subTab) {
      NavActions.setTabOption(
        this.props.tab,
        'subTab',
        this.props.subTab
      );
    } else {
      NavActions.setTabOption(
        this.props.tab,
        'adding',
        true
      );
    }
  },

  render: function() {

    var style = this.props.selected ? {fontWeight: 700} : {};

    return (
      <div className="navbar-options-element">
        <div className="navbar-options-element-text"
          style={style}
          onClick={this.followButton} >
          {this.props.name}
        </div>
      </div>
    );
  }

});

module.exports = NewButton;
