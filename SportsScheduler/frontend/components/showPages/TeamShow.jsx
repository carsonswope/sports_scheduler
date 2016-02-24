var React = require('react');
var NavStore = require('../../stores/NavStore');

var TeamShow = React.createClass({

  render: function() {
    return (
      <div className="show-main">
        <div className="show-header-detail">
          {this.props.team.name}
        </div>
        <div className="show-header-detail">
          {this.props.team.contactName}
        </div>
        <div className="show-header-detail">
          {this.props.team.email}
        </div>
        <div className="show-header-detail">
          {this.props.team.phone}
        </div>
      </div>
    );
  }

});

module.exports = TeamShow;
