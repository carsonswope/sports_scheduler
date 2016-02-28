var React = require('react');
var PropTypes = React.PropTypes;

var CurrentMembersList = React.createClass({

  itemsList: function() {
    return this.props.items.map(function(item){
      return (
        <div key={item.id} className='add-component-option'>
          <div className='info-stat-text'
            style={{
              width: 214
            }}>
            {item.name}
          </div>
          <div onClick={this.removeItem.bind(this, item.id)}
            className='navbar-options-clear-icon'>
            X
          </div>
        </div>)
    }, this);
  },

  removeItem: function(itemId) {
    this.props.remove(itemId);
  },

  render: function() {

    return (
      <div className='info-stat-list'
        style={{height: this.props.height}}>
        {this.itemsList()}
      </div>
    );
  }

});

module.exports = CurrentMembersList;
