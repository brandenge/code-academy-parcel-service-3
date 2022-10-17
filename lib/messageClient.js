'use strict';

const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:3002/caps';
const client = require('socket.io-client');
const socket = client.connect(SOCKET_URL);

class MessageClient {
  constructor(client) {
    this.client = client;
    this.socket = socket;
    this.socket.emit('JOIN', client);
    this.socket.on('JOIN', (client) => {
      console.log(`Joined the client queue for: ${client}`);
    });
    this.socket.emit('GET_ALL', client);
  }

  publish(event, payload) {
    this.socket.emit(event, payload);
  }

  subscribe(event, eventHandler) {
    this.socket.on(event, eventHandler);
  }
}

module.exports = MessageClient;
