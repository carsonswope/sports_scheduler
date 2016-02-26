var React = require('react');
var PropTypes = React.PropTypes;
var NavStore = require('../../stores/NavStore');
var NavConstants = require('../../constants/NavConstants');
var Header = require('./headers/Header');

var ShowPage = React.createClass({

  //this.props.tabName
  //this.props.item

  getInitialState: function(){
    return {};
  },

  callToggle: function(){
    this.props.toggleFocus(this.props.item.id);
  },

  render: function() {

    var detail;
    if (this.props.focused) {
      var DetailPage = NavConstants.SHOW_DETAILS[this.props.tabName];
      detail = <DetailPage item={this.props.item} />
    }
    
    var BetterHeader = <Header item={this.props.item}
      itemType={this.props.tabName}
      toggleFocus={this.props.toggleFocus} />

    return (
      <div>
        <div className="show-main" onClick={this.callToggle}>
          {BetterHeader}
        </div>
        {detail}
      </ div>
    );

  }

});

module.exports = ShowPage;
