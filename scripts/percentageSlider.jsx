'use strict';

var React = require('react');
var props = React.PropTypes;
var Label = require('./label');
var css = require('./css');


var PercentageSlider = React.createClass({

  propTypes: {
    label: props.string,
    name: props.string.isRequired,
    value: props.number,
    onChange: props.func.isRequired,
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
      inputBox: {
        position: 'relative',
        width: '100%',
        maxWidth: 280,
      },
      input: {
        width: '100%',
        paddingBottom: 4,
        paddingTop: 4,
        border: 0,
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: css.color.grey.light,
        boxSizing: 'border-box',
        fontSize: css.fontSize.base,
        fontWeight: css.fontWeight.base,
        background: '#000',
      },
      extra: {
        position: 'absolute',
        right: 0,
        top: 5,
      },
    };

    return (
      <div>
        <Label label={`${this.props.label}: ${this.props.value}%`} name={this.props.name} />
        <div style={styles.inputBox}>
          <input
            id={this.props.name}
            style={styles.input}
            type="range"
            min="0"
            max="100"
            step="1"
            name={this.props.name}
            value={this.props.value}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  },

  handleChange(event) {
    this.props.onChange(event.target.value);
  },

});


module.exports = PercentageSlider;
