var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../actions/NavActions');

var Header = React.createClass({

  cancel: function() {
    debugger;
    NavActions.setTabOption(this.props.tab, 'adding', false);
  },

  render: function() {
    return (
      <div className="new-page-header">
        <div className="new-page-title">
          {this.props.title}
        </div>

        <div className="new-page-cancel-button" onClick={this.cancel}>
          X
        </div>
      </div>
    );
  }

});

module.exports = Header;
