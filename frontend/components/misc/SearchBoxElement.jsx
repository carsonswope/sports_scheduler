var React = require('react');
var PropTypes = React.PropTypes;

var SearchBoxElement = React.createClass({

  componentDidMount: function(){
    if (this.props.takeFocus) {
      this.refs.searchInput.focus();
    }
  },

  render: function() {
    return (
      <input
        ref="searchInput"
        className="text-entry-box navbar-options-search-box"
        type="text"
        id="search"
        value={this.props.searchValue}
        onChange={this.props.changeSearch} />
    );
  }

});

module.exports = SearchBoxElement;
