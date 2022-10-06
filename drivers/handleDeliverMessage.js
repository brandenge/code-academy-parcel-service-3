'use strict';

module.exports = (socket) => (order) => {
  setTimeout(() => {
    console.log(`DRIVER: delivered order ID: ${order.id}`);
    socket.emit('DELIVERED', order);
  }, 6000);
};
