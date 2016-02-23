var React = require('react');
var PropTypes = React.PropTypes;

var NavTab = React.createClass({

  setTab: function(){
    this.props.setTab(this.props.name);
  },

  render: function() {

    var className = "navbar-option";

    if (this.props.selectedTab === this.props.name) {className += " navbar-current"; }


    return (

      <div className={className} onClick={this.setTab}>
        {this.props.screenName}
      </div>
    );
  }

});

module.exports = NavTab;
