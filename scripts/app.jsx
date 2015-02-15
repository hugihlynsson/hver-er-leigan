'use strict';

var React = require('react');
var TextInput = require('./textInput');
var PercentageSlider = require('./percentageSlider');
var Tenant = require('./tenant');

require('./variables.css');
require('./app.css');


var App = React.createClass({

  getInitialState() {
    var lastState = localStorage.getItem('state');
    if (lastState) {
      return JSON.parse(lastState);
    }

    return {
      totalRent: 0,
      commonProportion: 0.5,
      tenants: [this.getNewTenant()],
    };
  },

  componentWillUpdate(nextProps, nextState) {
    // Calculate the correct rent
    nextState.tenants = this.getTenantsUpdatedRent(
      nextState.tenants,
      nextState.totalRent,
      nextState.commonProportion
    );
    localStorage.setItem('state', JSON.stringify(nextState));
  },

  render() {

    return (
      <div className="app">
        <h1 className="app_header">Hver er leigan?</h1>

        <div className="app_totalRent">
          <TextInput
            label="Heildar leiga"
            value={this.state.totalRent}
            extra="kr."
            name="totelRent"
            onChange={this.handleRentChange}
            type="number"
          />
        </div>

        <div className="app_commonProportion">
          <PercentageSlider
            label="Hlutfall sameignar"
            value={this.state.commonProportion * 100}
            name="commonProportion"
            onChange={this.handlePropotionChange}
          />
        </div>

        <div className="app_tenants">
          <p className="app_tenants_header">Leigjendur</p>
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
      </div>
    );
  },

  handleRentChange(totalRent) {
    var newTotalRent = totalRent ? parseInt(totalRent) : 0;
    this.setState({totalRent: newTotalRent});
  },

  handlePropotionChange(propotion) {
    this.setState({commonProportion: propotion/100});
  },

  handleUpdateTenant(tenant, index) {
    var tenants = this.state.tenants;
    tenants[index] = tenant;
    this.setState({tenants});
  },

  handleRemoveTenant(index) {
    var tenants = this.state.tenants;
    tenants.splice(index, 1);
    if (tenants.length === 0) {
      tenants.push(this.getNewTenant());
    }
    this.setState({tenants});
  },

  handleAddTenant(event) {
    event.preventDefault();
    var tenants = this.state.tenants;
    tenants.push(this.getNewTenant());
    this.setState({tenants});
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
