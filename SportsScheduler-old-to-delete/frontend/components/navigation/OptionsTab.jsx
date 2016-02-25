var React = require('react');
var NavConstants = require('../../constants/NavConstants');

var OptionsTab = React.createClass({

  getInitialState: function(){
    return { toRender: NavConstants.TAB_OPTIONS[this.props.name] };
  },

  render: function() {

    var ToRender = this.state.toRender;

    return (
      <ToRender />
    );
  }

});

module.exports = OptionsTab;
