'use strict';

window.ADVENTURE = 'ADVENTURE' in window ? ADVENTURE : {};

ADVENTURE.createMap = function () {
  const map = [];

  // 0 2 1 1 3  WATER = 0
  // 5 0 1 6 1  LAND = 1
  // 0 0 2 1 1  ITEM = 2
  // 0 5 0 2 6  HOME = 3
  // 4 0 5 0 1  CANADA = 4
  //            SEA PERIL = 5
  //            LAND PERIL = 6

  map.push('You sail the open seas.');
  map.push('You enter a thick forest of Ash and Elm. These trees would be perfect to build ships with.');
  map.push('You trek over hill and dale.');
  map.push('You trek over hill and dale.');
  map.push('You step outside of your cosy cabin and proudly survey your domain.');

  map.push('You encounter a storm and while the ships are thrown around, you and your crew escape unscathed.');
  map.push('You sail the open seas.');
  map.push('You trek over hill and dale.');
  map.push('You encounter bandits and even though you win, you lose 3 men.');
  map.push('You trek over hill and dale.');

  map.push('You sail the open seas.');
  map.push('You sail the open seas.');
  map.push('You come across a large market in a crowded town. You find much needed food and ale for sale for the journey ahead.');
  map.push('You trek over hill and dale.');
  map.push('You trek over hill and dale.');

  map.push('You sail the open seas.');
  map.push('You sail right into a massive whirlpool and end up losing two ships to Ægir.');
  map.push('You sail the open seas.');
  map.push(`You visit the town's blacksmith and commission a bunch of sharp axes and strong shields.`);
  map.push('You encounter bandits and even though you win, you lose 3 men.');

  map.push('You land on what is today called Canada. You stay here for a winter after which you pack a boat with grapes and head home.');
  map.push('You sail the open seas.');
  map.push('You encounter pirates and take on damages to one of your ships ultimately resulting in its sinking.');
  map.push('You sail the open seas.');
  map.push('You trek over hill and dale.');

  return map;
};

ADVENTURE.getWater = function () {
  const water = [0, 5, 6, 10, 11, 15, 16, 17, 21, 22, 23];

  return water;
};

ADVENTURE.theEnd = 20;
