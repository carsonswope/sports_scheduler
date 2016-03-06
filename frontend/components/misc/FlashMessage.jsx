var React = require('react');
var PropTypes = React.PropTypes;

var FlashMessage = React.createClass({

  getInitialState: function(){
    return {
      className: 'flash-message-visible'
    };
  },

  componentDidMount: function(){
    setTimeout(this.fadeOut, this.props.time)
  },

  fadeOut: function(){
    this.setState({
      className: 'flash-message-invisible'
    });
  },

  render: function() {
    return (
      <div className={this.state.className}>
        <div className='flash-message-text'>
          {this.props.message}
        </div>
      </div>
    );
  }

});

module.exports = FlashMessage;
