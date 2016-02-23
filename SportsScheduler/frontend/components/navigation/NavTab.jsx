var React = require('react');
var PropTypes = React.PropTypes;
var ExpandButton = require('./ExpandButton');

var NavTab = React.createClass({

  getInitialState: function(){
    return {expanded: false};
  },

  handleClick: function(e){
    e.preventDefault();

    if (this.props.selectedTab !== this.props.name){
      this.props.setTab(this.props.name);
    } else {
      if (this.props.tabOptions) {
        this.setState({expanded: !this.state.expanded});
      }
    }
  },

  render: function() {

    var className = "navbar-option";
    if (this.props.selectedTab === this.props.name) {
      className += " navbar-current";
    }

    var expandButton = null;
    if (this.props.selectedTab === this.props.name && this.props.tabOptions) {
      var text = this.state.expanded ? '-' : '+';
      expandButton =(
        <div className="navbar-expand-button">
          {text}
        </div>
      )
    }

    var name=(
      <div className="navbar-tab-title">
        {this.props.screenName}
      </div>
    );


    return (

      <div className={className} onClick={this.handleClick}>
        {expandButton}
        {name}
      </div>
    );
  }

});

module.exports = NavTab;
