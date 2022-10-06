'use strict';

module.exports = (socket) => (order) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up order ID: ${order.id}`);
    socket.emit('IN-TRANSIT', order);
  }, 3000);
};
