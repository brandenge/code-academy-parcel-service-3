'use strict';

const EventLog = require('./eventLog');
const PORT = process.env.PORT || 3002;
const server = require('socket.io')(PORT);
const Queue = require('./queue');
const clientsQueue = new Queue();

const caps = server.of('/caps');

caps.on('connection', (socket) => {
  console.log(`Socket connected to the CAPS namespace at socket ID ${socket.id}`);

  socket.prependAny((event, message) => new EventLog(event, message).log());
  socket.on('JOIN', (room) => {
    socket.join(room);
    socket.to(room).emit('JOIN', room);
    console.log(`You have joined the room for ${room}`);
    socket.on('IN-TRANSIT', (message) => socket.to(room).emit('IN-TRANSIT', message));
    socket.on('DELIVERED', (message) => socket.to(room).emit('DELIVERED', message));
  });

  socket.on('PICKUP', (message) => {
    console.log('PICKUP FROM VENDOR');
    let currentClientQueue = clientsQueue.read(message.recipient);
    if (!currentClientQueue) {
      const queueKey = clientsQueue.store(message.recipient, new Queue());
      currentClientQueue = clientsQueue.read(queueKey);
    }
    currentClientQueue.store(message.id, message);
    socket.broadcast.emit('PICKUP', message);
  });

  socket.on('IN-TRANSIT', (message) => {
    let currentClientQueue = clientsQueue.read(message.recipient);
    if (!currentClientQueue) {
      const queueKey = clientsQueue.store(message.recipient, new Queue());
      currentClientQueue = clientsQueue.read(queueKey);
    }
    currentClientQueue.store(message.id, message);
    socket.broadcast.emit('IN-TRANSIT', message);
  });

  socket.on('DELIVERED', (message) => {
    let currentClientQueue = clientsQueue.read(message.recipient);
    if (!currentClientQueue) {
      const queueKey = clientsQueue.store(message.recipient, new Queue());
      currentClientQueue = clientsQueue.read(queueKey);
    }
    currentClientQueue.store(message.id, message);
    socket.broadcast.emit('DELIVERED', message);
  });

  socket.on('RECEIVED', (message) => {
    const currentQueue = clientsQueue.read(message.recipient);
    if (!currentQueue) {
      console.log('No queue created');
      return;
    }
    const receivedMessage = currentQueue.remove(message.id);
    console.log(`Removed message from the queue: ${receivedMessage}`);
  });

  socket.on('GET_ALL', (recipient) => {
    console.log('Getting all messages for:', recipient);

    const currentQueue = clientsQueue.read(recipient);
    if (currentQueue && currentQueue.data) {
      Object.keys(currentQueue.data).forEach(messageId => {
        socket.emit(currentQueue.data[messageId].event, currentQueue.read(messageId));
        console.log('queue message accessed', {id: messageId, message: currentQueue[messageId]});
      });
    }
  });
});
