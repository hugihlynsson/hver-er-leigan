'use strict';

var React = require('react');
var props = React.PropTypes;
var Label = require('./label');


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
    return (
      <div className="textInput">
        <Label label={this.props.label} name={this.props.name} />
        <div className="textInput_box">
          {this.props.extra &&
            <span className="textInput_extra">{this.props.extra}</span>
          }
          <input
            id={this.props.name}
            className="textInput_input"
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
