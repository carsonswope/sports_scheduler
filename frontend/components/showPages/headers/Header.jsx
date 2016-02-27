var React = require('react');
var PropTypes = React.PropTypes;
var NavConstants = require('../../../constants/NavConstants');

var Header = React.createClass({

  //this.props.deleteAction
  //this.props.item

  delete: function(){

    NavConstants.destroyActions[this.props.itemType](this.props.item.id)

  },

  toggleFocus: function(){
    this.props.toggleFocus();
  },

  render: function() {

    var titleStyle = 'navbar-tab-title'
    if (this.props.focused) { titleStyle += ' navbar-tab-title-selected'}

    return (
        <div className='show-item-header' onClick={this.toggleFocus}>
          <div className='navbar-option'>
            <div className={titleStyle}>
              {this.props.item.name}
            </div>
          </div>
          <div className="header-delete-button main-element-text"
            onClick={this.delete}>
            delete
          </div>
        </div>
    );

  }

});

module.exports = Header;
