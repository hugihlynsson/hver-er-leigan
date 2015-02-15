'use strict';

var React = require('react');
var props = React.PropTypes;

require('./label.css');

var Label = React.createClass({

  propTypes: {
    label: props.string,
    name: props.string.isRequired,
    location: props.oneOf(['left']),
  },

  render() {
    var classes = 'label';
    if (this.props.location) {
      classes += ' label-' + this.props.location;
    }
    return (
      <label className={classes} htmlFor={this.props.name}>{this.props.label}</label>
    );
  },

});


module.exports = Label;
