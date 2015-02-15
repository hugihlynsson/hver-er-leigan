'use strict';

var React = require('react');
var props = React.PropTypes;
var TextInput = require('./textInput');
var css = require('./css');


var Tenant = React.createClass({

  propTypes: {
    tenant: props.shape({
      name: props.string,
      proportion: props.number,
      rent: props.number,
    }).isRequired,
  },

  render() {

    var styles = {
      tenant: {
        marginBottom: '2em',
      },
      remove: {
        display: 'block',
        color: css.color.text.light,
        fontSize: css.fontSize.small,
        letterSpacing: css.letterSpacing.loose,
        textTransform: 'uppercase',
      },
    };

    return (
      <div style={styles.tenant}>
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
          value={this.props.tenant.rent && this.props.tenant.rent + ' kr.'}
          name="rent"
          type="number"
          disabled
        />
        <a href="#" style={styles.remove} onClick={this.handleRemove}>
          Fjarlægja leigjanda
        </a>
      </div>
    );
  },

  handleNameChange(value) {
    console.log('Tenant: changing name');
    var tenant = this.props.tenant;
    tenant.name = value;
    this.props.onChange(tenant);
  },

  handleProportionChange(value) {
    console.log('Tenant: changing proportion');
    var tenant = this.props.tenant;
    tenant.proportion = value;
    this.props.onChange(tenant);
  },

  handleRemove(event) {
    console.log('Tenant: removing');
    event.preventDefault();
    this.props.onRemove();
  },

});


module.exports = Tenant;
