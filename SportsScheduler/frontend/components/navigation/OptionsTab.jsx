var React = require('react');

var OptionsTab = React.createClass({

  render: function() {

    this.props.name

    return (
      <div className="navbar-expanded"
        style={{height: 135}}>
        <div onClick={this.clicked}> options {this.props.name}</div>
      </div>
    );
  }

});

module.exports = OptionsTab;
