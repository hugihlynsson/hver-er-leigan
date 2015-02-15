'use strict';

var React = require('react');
var props = React.PropTypes;
var Label = require('./label');


var PercentageSlider = React.createClass({

  propTypes: {
    label: props.string,
    name: props.string.isRequired,
    value: props.number,
    onChange: props.func.isRequired,
  },

  render() {
    var roundedValue = this.props.value.toString().split('.')[0];

    return (
      <div className="percentageSlider">
        <Label label={`${this.props.label}: ${roundedValue}%`} name={this.props.name} />
        <div className="percentageSlider_input_box">
          <input
            id={this.props.name}
            className="percentageSlider_input"
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
