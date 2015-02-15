'use strict';

var React = require('react');
var props = React.PropTypes;
var Label = require('./label');

require('./textInput.css');


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
    labelStyle: props.oneOf(['left']),
  },

  render() {
    var inputClasses = 'textInput_input';
    var labelBoxClasses = 'textInput_labelBox';
    var inputBoxClasses = 'textInput_inputBox';
    if (this.props.labelStyle) {
      inputClasses += ' textInput_input-' + this.props.labelStyle;
      labelBoxClasses += ' textInput_labelBox-' + this.props.labelStyle;
      inputBoxClasses += ' textInput_inputBox-' + this.props.labelStyle;
    }

    return (
      <div className="textInput u-clearfix">
        <div className={labelBoxClasses}>
          <Label label={this.props.label} name={this.props.name} location={this.props.labelStyle} />
        </div>
        <div className={inputBoxClasses}>
          {this.props.extra &&
            <span className="textInput_extra">{this.props.extra}</span>
          }
          <input
            id={this.props.name}
            className={inputClasses}
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
