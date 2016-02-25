var React = require('react');
var PropTypes = React.PropTypes;
var NavStore = require('../../stores/NavStore');
var NavConstants = require('../../constants/NavConstants');

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

    var HeaderPage = NavConstants.SHOW_HEADERS[this.props.tabName];
    header = <HeaderPage item={this.props.item} toggleFocus={this.props.toggleFocus}/>

    return (
      <div>
        <div className="show-main" onClick={this.callToggle}>
          {header}
        </div>
        {detail}
      </ div>
    );

  }

});

module.exports = ShowPage;
