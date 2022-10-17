'use strict';

const Chance = require('chance');

const chance = new Chance();

class Order {
  constructor(vendor) {
    this.id = chance.guid();
    this.customer = chance.name();
    this.address = chance.address();
    this.vendor = vendor;
  }
}

module.exports = Order;
