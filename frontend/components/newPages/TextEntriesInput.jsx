var React = require('react');

exports.makeInputs = function(formContext, entries){

  return entries.map(function(entry, i){

    return(
      <div className='info-stat'
        style={{width: 520}}
        key={i}
        onClick={this.focusEntry.bind(this, entry.varName)}>
        <div className='info-stat-label'>
          {entry.title}
        </div>
        <input className="info-stat-text text-entry-box"
          type="text"
          ref={entry.varName}
          style={{bottom: -2, color: '#16174f'}}
          valueLink={this.linkState(entry.varName)} />
      </div>
    );

  }, formContext)
};
