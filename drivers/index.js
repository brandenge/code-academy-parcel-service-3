'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/caps');

const handlePickupMessage = require('./handlePickupMessage');
const handlePickup = handlePickupMessage(socket);
const handleDeliverMessage = require('./handleDeliverMessage');
const handleDeliver = handleDeliverMessage(socket);

socket.on('PICKUP', handlePickup);
socket.on('IN-TRANSIT', handleDeliver);
