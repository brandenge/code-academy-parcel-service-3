'use strict';

const { Server } = require('socket.io');
const logEvent = require('./logEvent');
const PORT = process.env.PORT || 3002;

const server = new Server(PORT);

const caps = server.of('/CAPS');
const vendors = server.of('Vendors');
const drivers = server.of('Drivers');

server.on('connection', (socket) => {
  console.log(`Socket connected to the Event Server at socket ID ${socket.id}`);
  socket.on('PICKUP', (order) => {
    drivers.emit('PICKUP');
    logEvent('PICKUP', order);
  });

  socket.on('IN-TRANSIT', (order) => {
    vendors.emit('IN-TRANSIT');
    logEvent('IN-TRANSIT', order);
  });

  socket.on('DELIVERED', (order) => {
    vendors.emit('DELIVERED');
    logEvent('DELIVERED', order);
  });
});
