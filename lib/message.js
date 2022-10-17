'use strict';

const uuid = require('uuid').v4;

class Message {
  constructor(text, order, event, sender, recipient) {
    this.text = text;
    this.order = order;
    this.event = event;
    this.sender = sender;
    this.recipient = recipient;
    this.id = uuid();
  }
}

module.exports = Message;
