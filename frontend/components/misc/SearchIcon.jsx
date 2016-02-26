var React = require('react');
var PropTypes = React.PropTypes;

var SearchIcon = React.createClass({

  render: function() {
    return (<div className='search-icon'></div>)

    return (
      <img className="navbar-options-search-icon"
        src="https://cdn4.iconfinder.com/data/icons/miu/24/common-search-lookup-glyph-128.png" />
    );
  }

});

module.exports = SearchIcon;
