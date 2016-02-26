var React = require('react');
var PropTypes = React.PropTypes;
var NavConstants = require('../../../constants/NavConstants');

var Header = React.createClass({

  //this.props.deleteAction
  //this.props.item

  delete: function(){

    NavConstants.destroyActions[this.props.itemType](this.props.item.id)

  },

  render: function() {
    return (
      <div >
        {this.props.item.id} - {this.props.item.name}
        <div className="delete-button-on-header"
          style={{'float': 'right'}}
          onClick={this.delete}>
          delete
        </div>
      </div>
    );
  }

});

module.exports = Header;
