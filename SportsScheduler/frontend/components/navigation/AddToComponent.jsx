var React = require('react');
var PropTypes = React.PropTypes;

var NavStore = require('../../stores/NavStore');
var NavActions = require('../../actions/NavActions');

var SearchBar = require('../misc/SearchBar');

var AddToComponent = React.createClass({

  //this.makeAdd

  getInitialState: function(){
    return{
      searchString: '',
      adding: false,
      confirming: false
    };
  },

  componentDidMount: function(){
    this.navListener = NavStore.addListener(this.searchChange);
  },

  componentWillUnmount: function(){
    this.navListener.remove();
    // NavActions.setTabOption('ADD_TO_LEAGUE', 'nameSearch', '');
  },

  searchChange: function(){

    if (this.state.searchString !== NavStore.options('ADD_TO_LEAGUE').nameSearch) {
      this.setState({
        searchString: NavStore.options('ADD_TO_LEAGUE').nameSearch
      });
    }

    var remainingResults = this.props.list.filter(function(league){
      return league.name.indexOf(this.state.searchString) > -1;
    }, this);

    if (!remainingResults.some(function(league){
      return league.id === this.state.confirming;
    }, this)) {
      this.setState({confirming: false});
    }

  },

  handleClick: function(id){
    if (this.state.confirming === id) {
      this.props.makeAdd(id)
    } else {
      this.setState({confirming: id});
    }
  },

  startAdding: function(){

    this.setState({adding: true});

  },

  cancelAdding: function(){

    this.setState({
      adding: false, confirming: false
    });

  },

  render: function() {

    if (this.state.adding) {

      var remainingResults = this.props.list.filter(function(league){
        return league.name.indexOf(this.state.searchString) > -1;
      }, this);

      var remainingResultsList = remainingResults.map(function(league){
        var className = "add-component-option";
        var style = this.state.confirming === league.id ? " selected-option" : ""
        className += style;
        return <div className={className} key={league.id} onClick={this.handleClick.bind(this, league.id)}>{league.name}</div>;
      }, this);

      if (!remainingResultsList.length) {
        remainingResultsList = <div style={{color: '#aaa'}}> no {this.props.item} </div>
      }

      var toRender =(

        <div>
          <div onClick={this.cancelAdding}> cancel adding </div>
          <SearchBar tab={'ADD_TO_LEAGUE'} option={'nameSearch'} takeFocus={true} />
          <div className="add-component-options-main">
            {remainingResultsList}
          </div>
        </div>

      );

    } else {

      var toRender =(

        <div className="begin-add-to-button" onClick={this.startAdding}>
          {this.props.message}
        </div>

      );


    }

    var otherLeagues = this.props.list.map(function(league){
      return(
        <div>
          {league.id}
          {league.name}
        </div>);
    });


    return (
      <div>{toRender}</div>
    );
  }

});

module.exports = AddToComponent;
