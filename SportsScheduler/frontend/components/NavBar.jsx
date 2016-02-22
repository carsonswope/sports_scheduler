var React = require('react');

var NavActions = require('../actions/NavActions');
var NavStore = require('../stores/NavStore');

var Teams = require('./navigation/Teams');

var NavBar = React.createClass({

  getInitialState: function() {
    return {
      tab: NavStore.currentTab()
    };
  },

  componentDidMount: function() {
    this.navListener = NavStore.addListener(this.changeTab);
  },

  componentWillUnmount: function() {
    this.navListener.remove();
  },

  setTab: function(tab) {
    NavActions.setTab(tab);
  },

  changeTab: function() {
    this.setState({ tab: NavStore.currentTab() });
  },

  render: function() {
    return (
      <div className="navbar-main"
        style={{
          height: this.props.dims.height - 130
        }}>
        <Teams setTab={this.setTab}/>
        {this.state.tab}
      </div>
    );
  }

});

module.exports = NavBar;
