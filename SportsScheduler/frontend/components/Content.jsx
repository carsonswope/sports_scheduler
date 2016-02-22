var React = require('react');
var PropTypes = React.PropTypes;

var Content = React.createClass({

  render: function() {
    return (
      <div className="content-main"
        style={{
          height: this.props.dims.height - 130,
          width: this.props.dims.width - 240
        }}>

      </div>
    );
  }

});

module.exports = Content;
