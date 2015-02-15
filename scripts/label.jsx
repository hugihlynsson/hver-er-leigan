'use strict';

var React = require('react');
var props = React.PropTypes;


var Label = React.createClass({

  propTypes: {
    label: props.string,
    name: props.string.isRequired,
  },

  render() {
    return (
      <label className="label" htmlFor={this.props.name}>{this.props.label}</label>
    );
  },

});


module.exports = Label;
