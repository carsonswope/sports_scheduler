var React = require('react');
var PropTypes = React.PropTypes;

var NavStore = require('../../stores/NavStore');
var NavActions = require('../../actions/NavActions');

var LocalSearchBar = require('../misc/LocalSearchBar');

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
      this.setState({confirming: null});
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

  touchMove: function(e){

    e.preventDefault();
  },

  blurChange: function(){

  },

  render: function() {

    if (this.state.adding) {

      var remainingResults = this.props.list.filter(function(league){
        return league.name.indexOf(this.state.searchString) > -1;
      }, this);

      var remainingResultsList = remainingResults.map(function(league){
        var className = "add-component-option";
        var style = this.state.confirming === league.id ? "add-component-selected-option " : ""
        className = style + className;

        var textStyle = "info-stat-text ";
        textStyle += this.state.confirming === league.id ?
          "add-component-selected-option" : "add-component-option-text";

        return(
          <div className={className}
            key={league.id}
            onClick={this.handleClick.bind(this, league.id)}>
              <div className={textStyle}>
                {league.name}
              </div>

          </div>
        );
      }, this);

      if (!remainingResultsList.length) {
        remainingResultsList =
          <div style={{
              color: '#667467',
              position: 'relative',
              left: '21',
              bottom: '-6'}}>
            no {this.props.item}
          </div>
      }

      return(

        <div className="add-to-menu"
          onBlur={this.blurChange}
          style={{height: this.props.height}}>
          <div className="add-to-search-component">
              <LocalSearchBar
                classInfo={"add-to-search-bar"}
                tab={'ADD_TO_LEAGUE'}
                option={'nameSearch'}
                takeFocus={true}
                message={'add a team'}
                width={217}
                cancelSearch={this.cancelAdding} />


          </div>
          <div className="add-component-options-main"
            style={{height: this.props.height}}
            onScroll={this.touchMove} >
            {remainingResultsList}
          </div>
        </div>

      );

    } else {

      return(
        <div className="add-to-menu">
          <div className="add-to-search-component">
            <div className="begin-add-to-button" onClick={this.startAdding}>
                {this.props.message}
            </div>
          </div>
        </div>

      );

    }
  }

});

module.exports = AddToComponent;
