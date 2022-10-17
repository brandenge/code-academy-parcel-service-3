'use strict';

class EventLog {
  constructor(event, payload) {
    this.event = event;
    this.time = new Date().toString();
    this.payload = payload;
  }

  log() {
    console.log('EVENT:', {
      event: this.event,
      time: this.time,
      payload: this.payload,
    });
  }
}

module.exports = EventLog;
