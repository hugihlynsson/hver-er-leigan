'use strict';

var React = require('react');
var props = React.PropTypes;
var css = require('./css');


var Label = React.createClass({

  propTypes: {
    label: props.string,
    name: props.string.isRequired,
  },

  render() {

    var styles = {
      label: {
        display: 'block',
        color: css.color.text.light,
        fontSize: css.fontSize.small,
        letterSpacing: css.letterSpacing.loose,
        textTransform: 'uppercase',
      },
    };

    return (
      <label style={styles.label} htmlFor={this.props.name}>{this.props.label}</label>
    );
  },

});


module.exports = Label;
