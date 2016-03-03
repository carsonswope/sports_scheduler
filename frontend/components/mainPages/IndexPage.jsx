var React = require('react');
var PropTypes = React.PropTypes;

var NavConstants = require('../../constants/NavConstants');
var NavStore = require('../../stores/NavStore');
var NavActions = require('../../actions/NavActions');
var ShowPage = require('../showPages/ShowPage.jsx');
var ScheduleCriteria = require('../showPages/ScheduleCriteria.jsx');

var IndexPage = React.createClass({

  ///this.props.resourceType

  getInitialState: function(){

    var resource = NavStore.currentTab();
    var options = NavStore.options(resource);
    var store = NavConstants.STORES[resource];

    var items = store.getMatching(options.nameSearch);
    var focused = items.length === 1 ?
      items[0].id : options['focused'];

    return {
      resource: resource,
      store: store,
      items: items,
      options: options,
      focused: focused
    };

  },

  componentDidMount: function(){

    this.resourceListener = this.state.store.addListener(this.resourceChange);
    this.navListener = NavStore.addListener(this.navChange);
  },


  componentWillUnmount: function(){
    this.resourceListener.remove();
    this.navListener.remove();
  },

  changeListener: function(store){
    this.resourceListener.remove();
    this.resourceListener = store.addListener(this.resourceChange);
  },

  resourceChange: function(){

    var items = this.state.store.getMatching(this.state.options.nameSearch);

    var focused = items.length === 1 ?
      items[0].id : this.state.focused;

    this.setState({
      items: items,
      focused: focused
    });

  },

  getMatchingItems: function(store, search){
    return store.getMatching(search);
  },

  changePage: function(){

    var resource = NavStore.currentTab();
    var options = NavStore.options(resource);
    var store = NavConstants.STORES[resource];

    this.changeListener(store);

    // var items = store.getMatching(options.nameSearch);
    var items = this.getMatchingItems(store, options.nameSearch);
    var focused = items.length === 1 ?
      items[0].id : null;

    this.setState({
      resource: resource,
      store: store,
      items: items,
      options: options,
      focused: focused
    });

  },

  updatePage: function(){

    var options = NavStore.options( this.state.resource );
    var items = this.getMatchingItems(
      this.state.store,
      this.state.options.nameSearch
    );

    var focused;

    if (items.length === 1) {
      focused = items[0].id;
    } else if (items.length > this.state.items.length) {
      focused = null;
    } else {
      focused = this.state.focused;
    }

    this.setState({
      items: items,
      options: options,
      focused: focused
    });

  },

  navChange: function(){

    if (NavConstants.MAIN_PAGES[NavStore.currentTab()] !== IndexPage) {
      //will be dismounted shortly....
      return;
    } else if (NavStore.currentTab() !== this.state.resource) {
      this.changePage();
    } else {
      this.updatePage();
    }

  },


  toggleFocus: function(id){
    if (this.state.focused === id) {
      this.setState({focused: null});
    } else {
      this.setState({focused: id});
    }

    // NavActions.setTabOption(
    //   this.state.resource,
    //   'focused',
    //   !NavStore.options(this.state.resource)['focused']
    // );

  },

  itemsInIndex: function(){
    return this.state.items.map(function(item){

      return(
        <ShowPage key={item.id}
          item={item}
          tabName={this.state.resource}
          focused={this.state.focused === item.id}
          toggleFocus={this.toggleFocus} />
      );
    }, this);
  },

  render: function() {

    var content;

    if (this.state.options.adding) {
      var AddPage = NavConstants.ADD_PAGES[this.state.resource];
      content = <AddPage />;
    } else {
      content = this.itemsInIndex();
    }

    return (
      <div>

        <div className='show-item show-item-focused'
          style={{marginTop: -4}}>
          <div className='show-item-header'>
            <div className='schedule-criteria-title'
              style={{left: 30}}>
              {NavConstants.SCREEN_NAMES[this.state.resource]}:
            </div>
          </div>
        </div>

        {content}

      </div>
    );
  }

});

module.exports = IndexPage;
