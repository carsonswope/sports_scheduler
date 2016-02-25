var React = require('react');
var PropTypes = React.PropTypes;
var NavStore = require('../../stores/NavStore');
var NavActions = require('../../actions/NavActions');
var NavConstants = require('../../constants/NavConstants');
var SearchIcon = require('./SearchIcon');

//this.props.tab
//this.props.option

var SearchBar = React.createClass({

  getInitialState: function() {
    return {
      searchValue: NavStore.options(this.props.tab)[this.props.option]
    };
  },

  componentDidMount: function(){
    this.navListener = NavStore.addListener(this.changeSearchValue);
    if (this.props.takeFocus) {
      this.refs.searchInput.focus();
    }
  },

  componentWillUnmount: function(){
    this.navListener.remove();
  },

  changeSearchValue: function(){
    this.setState({
      searchValue: NavStore.options(this.props.tab)[this.props.option]
    });
  },

  changeSearch: function(e) {
    NavActions.setTabOption(this.props.tab, this.props.option, e.target.value);
    this.setState({searchValue: e.target.value});
  },

  clearSearch: function(e) {
    NavActions.setTabOption(this.props.tab, this.props.option, '');
    this.setState({searchValue: ''});
  },

  render: function() {
    return (
        <div className="navbar-options-search-bar">
          <SearchIcon />
          <input
            ref="searchInput"
            className="text-entry-box navbar-options-search-box"
            type="text"
            id="search"
            value={this.state.searchValue}
            onChange={this.changeSearch}/>
          <div className="navbar-options-clear-icon"
            onClick={this.clearSearch}> X </div>
        </div>
    );
  }

});

module.exports = SearchBar;