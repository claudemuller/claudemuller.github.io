'use strict';

window.ADVENTURE = 'ADVENTURE' in window ? ADVENTURE : {};

ADVENTURE.createImages = function () {
  const images = [];

  // 0 2 1 1 3  WATER = 0
  // 5 0 1 6 1  LAND = 1
  // 0 0 2 1 1  ITEM = 2
  // 0 5 0 2 6  HOME = 3
  // 4 0 5 0 1  CANADA = 4
  //            SEA PERIL = 5
  //            LAND PERIL = 6

  images.push('sea.jpg');
  images.push('forest.jpg');
  images.push('land.jpg');
  images.push('land.jpg');
  images.push('home.jpg');

  images.push('storm.jpg');
  images.push('sea.jpg');
  images.push('land.jpg');
  images.push('bandits.jpg');
  images.push('land.jpg');

  images.push('sea.jpg');
  images.push('sea.jpg');
  images.push('market.jpg');
  images.push('land.jpg');
  images.push('land.jpg');

  images.push('sea.jpg');
  images.push('whirlpool.jpg');
  images.push('sea.jpg');
  images.push('blacksmith.jpg');
  images.push('bandits.jpg');

  images.push('canada.jpg');
  images.push('sea.jpg');
  images.push('pirates.jpg');
  images.push('sea.jpg');
  images.push('land.jpg');

  return images;
};
