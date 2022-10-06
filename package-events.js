'use strict';

const eventPool= require('./eventPool');

const eventPool = new Event();

function logEvent(){
  const date = new Date();
  const time = date.toDateString();
  console.log('EVENT', {event, time, payload});
}

function pickup(payload) {
  setTimeout(() => {
    const eventLog = {
      event: 'PICKUP',
      time: date.toDMGString(),
      payload: payload,
    };
    logEvent('PICKUP', payload);
  })
}



function delivered(payload) {
  setTimeout(() => {
    const eventLog = {
      event: 'DELIVERED',
      time: date.toDMGString(),
      payload: payload,
    };
    console.log('EVENT_LOG', eventLog);
  }, 500);
}


module.exports = { inTransit, pickup, delivered };
