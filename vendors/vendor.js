'use strict';

const MessageClient = require('../lib/messageClient');
const Order = require('./order');
const Message = require('../lib/message');
const handleDelivered = require('./handleDelivered');

class Vendor extends MessageClient {
  constructor(name) {
    super(name);

    this.subscribe('IN-TRANSIT', (message) => {
      this.publish('RECEIVED', message);
      console.log(`MESSAGE RECEIVED: ${message.text}`);
    });

    this.subscribe('DELIVERED', (message) => {
      handleDelivered(message.order);
      this.publish('RECEIVED', message);
      console.log(`MESSAGE RECEIVED: ${message.text}`);
    });

    setInterval(() => {
      const order = new Order(name);
      const newOrderMessage = `ORDER READY NOTICE FROM ${name}: Order ID ${order.id} ready for pickup`;
      this.publish('PICKUP', new Message(newOrderMessage, order, 'PICKUP', name, 'driver'));
      console.log(newOrderMessage);
    }, 2000);
  }
}

module.exports = Vendor;
