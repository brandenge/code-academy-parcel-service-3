'use strict';

const { Server } = require('socket.io');
const Order = require('./order');
const PORT = process.env.PORT || 3003;

const server = new Server(PORT);

server.on('connection', (socket) => {
  console.log(`Socket connected to the Vendors Server at socket ID ${socket.id}`);
  socket.on('DELIVERED', (order) => {
    console.log(`VENDOR: Thank your for delivering order ID: ${order.id}`);
  });
  socket.on('NEW_ORDER', (order) => {
    setTimeout(() => socket.emit('PICKUP', order), 3000);
  });
  setInterval(() => {
    const order = new Order();
    socket.emit('NEW_ORDER', order);
  }, 12000);
  const order = new Order();
  socket.emit('NEW_ORDER', order);
});
