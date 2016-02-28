var React = require('react');
var PropTypes = React.PropTypes;
var NavActions = require('../../actions/NavActions');

var NewHeader = React.createClass({

  cancel: function() {
    NavActions.setTabOption(this.props.tab, 'adding', false);
  },

  render: function() {
    return (
      <div className='show-item-header'>
        <div className='navbar-option'>
          <div className='navbar-tab-title navbar-tab-title-selected'>
            {this.props.message}
          </div>
        </div>
        <div className='header-delete-button main-element-text'
          onClick={this.cancel}>
          cancel
        </div>
      </div>
    );
  }

});

module.exports = NewHeader;
