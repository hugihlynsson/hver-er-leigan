'use strict';

var React = require('react');
var props = React.PropTypes;
var Label = require('./label');
var css = require('./css');


var TextInput = React.createClass({

  propTypes: {
    label: props.string,
    type: props.oneOf([
      'number',
      'text',
      'email',
    ]).isRequired,
    value: props.oneOfType([
      props.string,
      props.number
    ]),
    extra: props.string,
    name: props.string.isRequired,
    onChange: props.func,
    disabled: props.bool,
  },

  render() {

    var styles = {
      inputBox: {
        position: 'relative',
        width: '100%',
        maxWidth: 280,
      },
      input: {
        width: '100%',
        paddingBottom: 4,
        paddingTop: 4,
        paddingRight: 30,
        border: 0,
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: css.color.grey.light,
        boxSizing: 'border-box',
        fontSize: css.fontSize.base,
        fontWeight: css.fontWeight.base,
      },
      extra: {
        position: 'absolute',
        right: 0,
        top: 5,
      },
    };

    return (
      <div>
        <Label label={this.props.label} name={this.props.name} />
        <div style={styles.inputBox}>
          {this.props.extra &&
            <span style={styles.extra}>{this.props.extra}</span>
          }
          <input
            id={this.props.name}
            style={styles.input}
            type="text"
            name={this.props.name}
            value={this.props.value}
            onChange={this.handleChange}
            disabled={this.props.disabled}
          />
        </div>
      </div>
    );
  },

  handleChange(event) {
    this.props.onChange(event.target.value);
  },

});


module.exports = TextInput;
