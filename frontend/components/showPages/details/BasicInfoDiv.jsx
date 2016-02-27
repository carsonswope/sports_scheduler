var React = require('react');
var PropTypes = React.PropTypes;

var BasicInfoDiv = React.createClass({

  // this.props.stats = [{
  //   label: 'label 1',
  //   text: 'text 1'
  // },{
  //   label: 'label 2',
  //   text: 'text 2'
  // }]

  render: function() {

    var info = this.props.stats.map(function(stat, i){
      return(

          <div className="info-stat" key={i}>
            <div className="info-stat-label">
              {stat.label}
            </div>
            <div className="info-stat-text">
              {stat.text}
            </div>
          </div>

      );
    });

    return (
      <div className="show-basic-info">
        {info}
      </div>
    );
  }

});

module.exports = BasicInfoDiv;
