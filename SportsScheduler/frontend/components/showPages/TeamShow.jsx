var React = require('react');

var TeamShow = React.createClass({

  render: function() {
    return (
      <div className="team-show-main">
        <div className="team-show-detail">
          {this.props.team.name}
        </div>
        <div className="team-show-detail">
          {this.props.team.contactName}
        </div>
        <div className="team-show-detail">
          {this.props.team.email}
        </div>
        <div className="team-show-detail">
          {this.props.team.phone}
        </div>
      </div>
    );
  }

});

module.exports = TeamShow;
