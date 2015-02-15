'use strict';

var React = require('react');
var props = React.PropTypes;
var TextInput = require('./textInput');


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
      <div className="tenant">
        <TextInput
          label="Nafn"
          value={this.props.tenant.name}
          onChange={this.handleNameChange}
          name="nafn"
          type="number"
        />
        <TextInput
          label="Stærð herbergis"
          value={this.props.tenant.proportion}
          extra="fm"
          onChange={this.handleProportionChange}
          name="proportion"
          type="number"
        />
        <TextInput
          label="Reiknuð leiga"
          value={this.props.tenant.rent && Math.round(this.props.tenant.rent) + ' kr.'}
          name="rent"
          type="number"
          disabled
        />
        <a href="#" className="tenant_remove" onClick={this.handleRemove}>
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
    tenant.proportion = value ? parseInt(value) : undefined;
    this.props.onChange(tenant);
  },

  handleRemove(event) {
    event.preventDefault();
    this.props.onRemove();
  },

});


module.exports = Tenant;
