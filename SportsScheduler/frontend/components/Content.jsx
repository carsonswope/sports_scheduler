var React = require('react');
var PropTypes = React.PropTypes;
var NavStore = require('../stores/NavStore');
var NavConstants = require('../constants/NavConstants');

var TeamsPage = require('./mainPages/TeamsPage');


var Content = React.createClass({

  getInitialState: function() {
    return { tab: NavStore.currentTab() };
  },

  componentDidMount: function() {
    this.navListener = NavStore.addListener(this.navChange);
  },

  componentDidDismount: function() {
    this.navListener.remove();
  },

  navChange: function() {
    this.setState({ tab: NavStore.currentTab() });
    // this.forceUpdate();
  },

  render: function() {

    var ToRender = NavConstants.PAGES[this.state.tab];

    return (

      <div className="content-main"
        style={{
          height: this.props.dims.height - 130,
          width: this.props.dims.width - 245
        }}>

        <ToRender />

      </div>
    );
  }

});

module.exports = Content;
