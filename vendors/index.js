'use strict';

const Vendor = require('./vendor');

const vendorNames = ['1-800-flowers', 'acme-widgets'];

const vendors = vendorNames.map(vendorName => new Vendor(vendorName));

console.log('Vendors instantiated', vendors);
