var React = require('react');
var PropTypes = React.PropTypes;

var CurrentMembersList = require('./CurrentMembersList');
var AddToComponent = require('./AddToComponent');
// var BasicInfoDiv = require('../showPages/details/BasicInfoDiv');

var MembershipsShow = React.createClass({

  //this.props.membershipName: 'member teams'
  //this.props.itemsList = this.getXList()...
  //this.props.removeItem = this.removeX...
  //this.props.addItem = this.addX
  //this.props.possibleItemsToAdd =
  //this.props.addMessage
  //this.props.itemName
  //this.props.height

  render: function() {

    return (
      <div className="show-basic-info"
        style={{height: this.props.height}}>

        <div className="info-stat">
          <div className="info-stat-label">
            {this.props.membershipName}
          </div>
        </div>

        <CurrentMembersList items={this.props.itemsList}
          remove={this.props.removeItem}
          height={this.props.height - 20}/>

        <AddToComponent
          makeAdd={this.props.addItem}
          list={this.props.possibleItemsToAdd}
          message={this.props.addMessage}
          item={this.props.itemName}
          height={this.props.height - 20}/>
      </div>
    );
  }

});

module.exports = MembershipsShow;
