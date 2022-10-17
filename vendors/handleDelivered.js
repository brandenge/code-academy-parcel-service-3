'use strict';

module.exports = (order) => {
  console.log(`${order.vendor}: Thank you for delivering order ID: ${order.id} to ${order.customer}`);
};
