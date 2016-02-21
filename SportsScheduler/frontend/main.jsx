var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');

$(function(){

  ReactDOM.render(
    <App />,
    document.getElementById('editor')
  );

});
