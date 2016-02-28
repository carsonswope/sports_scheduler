var React = require('react');
var PropTypes = React.PropTypes;
var NavStore = require('../../stores/NavStore');
var NavActions = require('../../actions/NavActions');
var NavConstants = require('../../constants/NavConstants');
var SearchIcon = require('./SearchIcon');
var SearchBoxElement = require('./SearchBoxElement');

//this.props.tab
//this.props.option

var SearchBar = React.createClass({

  getInitialState: function() {
    return {
      searching: false,
      searchValue: NavStore.options(this.props.tab)[this.props.option]
    };
  },

  componentDidMount: function(){
    this.navListener = NavStore.addListener(this.changeSearchValue);
    // if (this.props.takeFocus) {
    //   this.refs.searchInput.focus();
    // }
  },

  componentWillUnmount: function(){
    this.navListener.remove();
  },

  changeSearchValue: function(){

    if (NavStore.currentTab() !== this.props.tab ||
        NavStore.options(this.props.tab)['adding'] ) {

      this.setState({searchValue: '', searching: false});

    } else {

      this.setState({
        searchValue: NavStore.options(this.props.tab)[this.props.option]
      });

    }
  },

  changeSearch: function(e) {
    NavActions.setTabOption(this.props.tab, this.props.option, e.target.value);
    this.setState({searchValue: e.target.value});
  },

  clearSearch: function(e) {
    NavActions.setTabOption(this.props.tab, this.props.option, '');
    this.setState({searchValue: '', searching: false});
  },

  startSearching: function(){
    NavActions.setTabOption(this.props.tab, 'adding', false);
    this.setState({searching: true});
  },

  render: function() {

    if (!this.state.searching) {
      return(
        <div className='navbar-options-element'>
          <div className='navbar-options-element-text'
            onClick={this.startSearching}>{this.props.message || 'search'}</div>
        </div>
      );
    } else {

      return(
        <div className='navbar-options-element'>
          <SearchBoxElement
            searchValue={this.state.searchValue}
            changeSearch={this.changeSearch}
            takeFocus={this.props.takeFocus} />
          <div className="navbar-options-clear-icon"
            onClick={this.clearSearch}> X </div>
        </div>
      );
    }

  }

});

module.exports = SearchBar;
