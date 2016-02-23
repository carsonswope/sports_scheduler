var React = require('react');



var TeamsOptions = React.createClass({

  clicked: function() {
    console.log('ah');
  },

  render: function() {
    return (
      <div className="navbar-expanded"
        style={{height: 135}}>
        <div onClick={this.clicked}> teams options</div>
      </div>
    );
  }

});

module.exports = TeamsOptions;
