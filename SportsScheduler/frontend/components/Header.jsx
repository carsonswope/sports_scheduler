var React = require('react');

var UserHeader = require('./UserHeader');

var Header = React.createClass({

  render: function() {

    return (
      <div className="header-main"
        style={{
          width: this.props.dims.width-12,
        }}>

        <div className="header-component header-logo">
          Logo here
        </div>


        <UserHeader user={this.props.user}/>

        <div className="header-component header-center">
          user company name / logo here
        </div>
      </div>
    );
  }

});

module.exports = Header;
