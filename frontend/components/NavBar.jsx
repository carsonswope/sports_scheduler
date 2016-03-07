var React = require('react');

var NavActions = require('../actions/NavActions');
var NavStore = require('../stores/NavStore');
var NavConstants = require('../constants/NavConstants');


var NavTab = require('./navigation/NavTab');

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

    var totalHeight = (this.props.dims.height-NavConstants.HEADER_HEIGHT_LOGGED_IN);
    var eachTabHeight = ((totalHeight - NavConstants.OPTIONS_HEIGHT[this.state.tab]) / 6)-5;

    var tabs = Object.keys(NavConstants.tabs).map(function(tab, i){
      return(

        <NavTab
          screenName={NavConstants.SCREEN_NAMES[tab]}
          name={NavConstants.tabs[tab]}
          key={i}
          height={50}
          setTab={this.setTab}
          selectedTab={this.state.tab}
          tabOptions={NavConstants.TAB_OPTIONS[tab]} />

      );
    }, this);

    return (
      <div id="navbar-main" className={this.props.hidden ? 'navbar-main-hidden' : 'navbar-main-shown'}
        style={{
          height: this.props.dims.height - 130,
          opacity: this.props.hidden ? 0 : 1
        }}>

        <div className='logo-bar'>
          <div className='logo-image'
            onClick={NavActions.setTab.bind(this, 'HOME')}
            style={{
              width: 160,
              top: -30,
              height: 150
            }}/>
        </div>

        {this.props.hidden ? null : tabs}

      </div>
    );
  }

});

module.exports = NavBar;
