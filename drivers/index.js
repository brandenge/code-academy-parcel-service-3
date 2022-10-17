'use strict';

const Message = require('../lib/message');
const MessageClient = require('../lib/messageClient');
const driver = new MessageClient('driver');

driver.subscribe('PICKUP', (message) => {
  setTimeout(() => {
    const inTransitMessage = `IN-TRANSIT NOTICE FROM DRIVER: Order ID: ${message.order.id} shipping from ${message.sender} to ${message.order.customer} has been picked up.`;
    driver.publish('IN-TRANSIT', new Message(inTransitMessage, message.order, 'IN-TRANSIT', 'driver', message.sender));
    console.log(inTransitMessage);
  }, 3000);
  setTimeout(() => {
    const deliveredMessage = `DELIVERY NOTICE FROM DRIVER: Order ID: ${message.order.id} shipping from ${message.sender} to ${message.order.customer} has been delivered.`;
    driver.publish('DELIVERED', new Message(deliveredMessage, message.order, 'DELIVERED', 'driver', message.sender));
    console.log(deliveredMessage);
  }, 6000);
  driver.publish('RECEIVED', message);
  console.log(`MESSAGE RECEIVED: ${message.text}`);
});
