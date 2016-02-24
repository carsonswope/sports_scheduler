var React = require('react');

var LeagueShow = React.createClass({

  render: function() {
    return (
      <div className="show-main">
        <div className="show-header-detail">
          {this.props.league.name}
        </div>
      </div>
    );
  }

});

module.exports = LeagueShow;
