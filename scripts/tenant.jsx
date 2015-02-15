'use strict';

var React = require('react');
var props = React.PropTypes;
var TextInput = require('./textInput');

require('./tenant.css');


var Tenant = React.createClass({

  propTypes: {
    tenant: props.shape({
      name: props.string,
      proportion: props.number,
      rent: props.number,
    }).isRequired,
  },

  render() {
    return (
      <div className="tenant u-clearfix">

        <div className="tenant_input">
          <TextInput
            label="Nafn"
            value={this.props.tenant.name}
            onChange={this.handleNameChange}
            name="nafn"
            type="number"
            labelStyle="left"
          />
        </div>

        <div className="tenant_input">
          <TextInput
            label="Stærð herbergis"
            value={this.props.tenant.proportion}
            extra="fm"
            onChange={this.handleProportionChange}
            name="proportion"
            type="number"
            labelStyle="left"
          />
        </div>

        <div className="tenant_input">
          <TextInput
            label="Reiknuð leiga"
            value={this.props.tenant.rent && Math.round(this.props.tenant.rent) + ' kr.'}
            name="rent"
            type="number"
            labelStyle="left"
            disabled
          />
        </div>

        <a href="#" className="tenant_remove" onClick={this.handleRemove} title="Fjarlægja leigjanda">
          Fjarlægja leigjanda
        </a>

      </div>
    );
  },

  handleNameChange(value) {
    var tenant = this.props.tenant;
    tenant.name = value;
    this.props.onChange(tenant);
  },

  handleProportionChange(value) {
    var tenant = this.props.tenant;
    var number = parseInt(value);
    tenant.proportion = value && !isNaN(number) ? number : undefined;
    this.props.onChange(tenant);
  },

  handleRemove(event) {
    event.preventDefault();
    this.props.onRemove();
  },

});


module.exports = Tenant;
