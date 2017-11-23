'use strict';

window.ADVENTURE = 'ADVENTURE' in window ? ADVENTURE : {};

ADVENTURE.createBlockedPathMessages = function () {
  const blockedPathMessages = [];

  // 0 2 1 1 3  WATER = 0
  // 5 0 1 6 1  LAND = 1
  // 0 0 2 1 1  ITEM = 2
  // 0 5 0 2 6  HOME = 3
  // 4 0 5 0 1  CANADA = 4
  //            SEA PERIL = 5
  //            LAND PERIL = 6

  blockedPathMessages.push('Your crew are too scared to sail in that direction.');
  blockedPathMessages.push(`You can't go that way.`);
  blockedPathMessages.push('The path is unpassable.');
  blockedPathMessages.push('The path is unpassable.');
  blockedPathMessages.push('There is nothing important in this direction.');

  blockedPathMessages.push('Your crew are too scared to sail in that direction.');
  blockedPathMessages.push('');
  blockedPathMessages.push('');
  blockedPathMessages.push('');
  blockedPathMessages.push('The path is unpassable.');

  blockedPathMessages.push('Your crew are too scared to sail in that direction.');
  blockedPathMessages.push('');
  blockedPathMessages.push('');
  blockedPathMessages.push('');
  blockedPathMessages.push('The path is unpassable.');

  blockedPathMessages.push('Canada has to be around here somewhere.');
  blockedPathMessages.push('');
  blockedPathMessages.push('');
  blockedPathMessages.push('');
  blockedPathMessages.push('The path is unpassable.');

  blockedPathMessages.push(`You've made it to Canada!`);
  blockedPathMessages.push('Canada has to be around here somewhere.');
  blockedPathMessages.push('Your crew are too scared to sail in that direction.');
  blockedPathMessages.push('Your crew are too scared to sail in that direction.');
  blockedPathMessages.push(`You can't go that way.`);

  return blockedPathMessages;
};
