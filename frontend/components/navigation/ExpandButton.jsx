var React = require('react');
var PropTypes = React.PropTypes;

var ExpandButton = React.createClass({

  render: function() {

    var t = this.props.expanded ? '-' : '+';

    return (
      <div onClick={this.props.toggle} className="navbar-expand-button">
        {t}
      </div>
    );
  }

});

module.exports = ExpandButton;
