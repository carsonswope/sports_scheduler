var React = require('react');
var PropTypes = React.PropTypes;
var ExpandButton = require('./ExpandButton');
var OptionsTab = require('./OptionsTab');
var NavStore = require('../../stores/NavStore');

var NavTab = React.createClass({

  getInitialState: function(){
    return {expanded: false};
  },

  componentDidMount: function(){
    this.navListener = NavStore.addListener(this.changeNav)
  },

  componentWillUnmount: function(){
    this.navListener.remove();
  },

  changeNav: function(){
    if (NavStore.currentTab() !== this.props.name) {
      this.setState({expanded: false});
    } else if (this.props.tabOptions) {

      this.setState({expanded: true});
    }
  },

  handleClick: function(e){
    e.preventDefault();

    if (this.props.selectedTab !== this.props.name) {
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

    options = this.state.expanded ? <OptionsTab name={this.props.name} /> : null


    var name=(
      <div className="navbar-tab-title">
        {this.props.screenName}
      </div>
    );


    return (
      <div>
        <div className={className}
          onClick={this.handleClick}
          style={{height: this.props.height}}>
          {expandButton}
          {name}
        </div>
        {options}
      </div>
    );
  }

});

module.exports = NavTab;
