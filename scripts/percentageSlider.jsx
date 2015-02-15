'use strict';

var React = require('react');
var props = React.PropTypes;
var Label = require('./label');

require('./percentageSlider.css');

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
        <div className="percentageSlider_labelBox">
          <Label label={this.props.label} name={this.props.name} />
        </div>

        <div className="percentageSlider_inputBox">
          <input
            id={this.props.name}
            className="percentageSlider_input"
            type="range"
            min="0"
            max="100"
            step="1"
            name={this.props.name}
            value={roundedValue}
            onChange={this.handleChange}
          />
          <span className="percentageSlider_value" style={{left: roundedValue + '%'}}>
            {roundedValue}%
          </span>
        </div>
      </div>
    );
  },

  handleChange(event) {
    this.props.onChange(event.target.value);
  },

});


module.exports = PercentageSlider;
