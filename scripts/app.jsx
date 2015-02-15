'use strict';

var React = require('react');
var TextInput = require('./textInput');
var PercentageSlider = require('./percentageSlider');
var Tenant = require('./tenant');

require('./variables.css');
require('./app.css');


var App = React.createClass({

  getInitialState() {
    return {
      totalRent: 0,
      commonProportion: 0.5,
      tenants: [this.getNewTenant()],
    };
  },

  render() {

    return (
      <div className="app">
        <h1 className="app_header">Hver er leigan?</h1>
        <TextInput
          label="Heildar leiga"
          value={this.state.totalRent}
          extra="kr."
          name="totelRent"
          onChange={this.handleRentChange}
          type="number"
        />
        <PercentageSlider
          label="Hlutfall sameignar"
          value={this.state.commonProportion * 100}
          name="commonProportion"
          onChange={this.handlePropotionChange}
        />
        <p>Leigjendur</p>
        {this.state.tenants.map((tenant, index) =>
          <Tenant
            key={index}
            tenant={tenant}
            onChange={(tenant) => this.handleUpdateTenant(tenant, index)}
            onRemove={() => this.handleRemoveTenant(index)}
          />
        )}
        <a href="#" className="app_addTenant" onClick={this.handleAddTenant}>
          Bæta við leigjanda
        </a>
      </div>
    );
  },

  handleRentChange(totalRent) {
    var newTotalRent = totalRent ? parseInt(totalRent) : 0;
    this.setState({
      totalRent: newTotalRent,
      tenants: this.getTenantsUpdatedRent(this.state.tenants, newTotalRent, this.state.commonProportion),
    });
  },

  handlePropotionChange(propotion) {
    this.setState({
      commonProportion: propotion/100,
      tenants: this.getTenantsUpdatedRent(this.state.tenants, this.state.totalRent, propotion/100),
    });
  },

  handleUpdateTenant(tenant, index) {
    var tenants = this.state.tenants;
    tenants[index] = tenant;
    this.setState({
      tenants: this.getTenantsUpdatedRent(tenants, this.state.totalRent, this.state.commonProportion),
    });
  },

  handleRemoveTenant(index) {
    var tenants = this.state.tenants;
    tenants.splice(index, 1);
    if (tenants.length === 0) {
      tenants.push(this.getNewTenant());
    }
    this.setState({
      tenants: this.getTenantsUpdatedRent(tenants, this.state.totalRent, this.state.commonProportion),
    });
  },

  handleAddTenant(event) {
    event.preventDefault();
    var tenants = this.state.tenants;
    tenants.push(this.getNewTenant());
    this.setState({
      tenants: this.getTenantsUpdatedRent(tenants, this.state.totalRent, this.state.commonProportion),
    });
  },

  getTenantsUpdatedRent(tenants, totalRent, commonProportion) {
    var validTenantsCount = tenants.filter(tenant => !!tenant.proportion).length;
    var partsCount = tenants.reduce((value, tenant) => (
      tenant.proportion ? value + parseInt(tenant.proportion) : value
    ), 0);

    var commonPart = totalRent * commonProportion / validTenantsCount;
    var proportionalPart = totalRent * (1 - commonProportion) / partsCount;

    tenants = tenants.map(tenant => {
      tenant.rent = tenant.proportion ? commonPart + proportionalPart * tenant.proportion : undefined;
      return tenant;
    });
    return tenants;
  },

  getNewTenant() {
    return {name: '', proportion: undefined, rent: undefined};
  },

});


module.exports = App;
