var React = require('react');
var PropTypes = React.PropTypes;

var NavConstants = require('../../constants/NavConstants');
var NavStore = require('../../stores/NavStore');
var ShowPage = require('../showPages/ShowPage.jsx');

var IndexPage = React.createClass({

  ///this.props.resourceType

  getInitialState: function(){

    var resource = NavStore.currentTab();
    var options = NavStore.options(resource);
    var store = NavConstants.STORES[resource];

    var items = store.getMatching(options.nameSearch);
    var focused = items.length === 1 ?
      items[0].id : null;

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

  resourceChange: function(){

    var items = this.state.store.getMatching(this.state.options.nameSearch);
    var focused = items.length === 1 ?
      items[0].id : this.state.focused;

    this.setState({
      items: items,
      focused: focused
    });

  },

  navChange: function(){

    // debugger;

    if (NavConstants.MAIN_PAGES[NavStore.currentTab()] !== IndexPage) {

    } else if (NavStore.currentTab() !== this.state.resource) {

      var resource = NavStore.currentTab();
      var options = NavStore.options(resource);
      var store = NavConstants.STORES[resource];

      this.resourceListener.remove();
      this.resourceListener = store.addListener(this.resourceChange);

      var items = store.getMatching(options.nameSearch);
      var focused = items.length === 1 ?
        items[0].id : null;

      this.setState({
        resource: resource,
        store: store,
        items: items,
        options: options,
        focused: focused
      });

    } else {

      var options = NavStore.options(
        this.state.resource
      );
      var items = this.state.store.getMatching(
        this.state.options.nameSearch
      );
      var focused;

      if (items.length === 1) {
        focused = items[0].id;
      } else if (items.length > this.state.items.length){
        focused = null;
      } else {
        focused = this.state.focused;
      }

      this.setState({
        items: items,
        options: options,
        focused: focused
      });

    }
  },

  toggleFocus: function(id){
    if (this.state.focused === id) {
      this.setState({focused: null});
    } else {
      this.setState({focused: id});
    }
  },

  render: function() {

    var items = this.state.items.map(function(item){

      return(
        <ShowPage key={item.id}
          item={item}
          tabName={this.state.resource}
          focused={this.state.focused === item.id}
          toggleFocus={this.toggleFocus} />
      );
    }, this);

    var content;

    if (this.state.options.adding) {
      var AddPage = NavConstants.ADD_PAGES[this.state.resource];
      content = <AddPage />;
    } else {
      content = items;
    }

    return (
      <div>{content}</div>
    );
  }

});

module.exports = IndexPage;
