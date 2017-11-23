'use strict';

window.ADVENTURE = 'ADVENTURE' in window ? window.ADVENTURE : {};

ADVENTURE.game = (function (global) {
  const output = document.querySelector('#output'),
    input = document.querySelector('#input'),
    actionBtn = document.querySelector('#action'),
    northBtn = document.querySelector('#north'),
    eastBtn = document.querySelector('#east'),
    southBtn = document.querySelector('#south'),
    westBtn = document.querySelector('#west'),
    image = document.querySelector('img');

  const startLocation = 4,
    actions = ['north', 'east', 'south', 'west', 'take', 'use', 'drop', 'buy', 'chop'],
    items = ['wood', 'weapons', 'food'],
    itemLocations = [1, 18, 12],
    itemsKnown = ['wood', 'weapons', 'food'],
    satchel = [],
    map = global.createMap(),
    images = global.createImages(),
    blockedPathMessages = global.createBlockedPathMessages(),
    water = global.getWater(),
    theEnd = global.theEnd;

  let playerInput = '',
    gameMessage = '',
    action = '',
    mapLocation = startLocation,
    item = '';

  function actionClickHandler() {
    const playerAction = input.value.toLowerCase();
    input.value = '';
    playGame(playerAction);
  }

  function northClickHandler() {
    playGame('north');
  }

  function eastClickHandler() {
    playGame('east');
  }

  function southClickHandler() {
    playGame('south');
  }

  function westClickHandler() {
    playGame('west');
  }

  function keyHandler(event) {
    if (event.keyCode === 13) actionClickHandler();
  }

  function playGame(input) {
    playerInput = input;

    gameMessage = '';
    action = '';

    // Work out player action
    for (let i = 0; i < actions.length; i++) {
      if (playerInput.indexOf(actions[i]) > -1) {
        action = actions[i];
        console.log(`Player's action: ${action}`);
        break;
      }
    }

    for (let i = 0; i < itemsKnown.length; i++) {
      if (playerInput.indexOf(itemsKnown[i]) > -1) {
        item = itemsKnown[i];
        console.log(`Player's item: ${item}`);
      }
    }

    // Choose correct action
    switch (action) {
      case 'north':
        if (mapLocation >= 5) {
          const tempMapLocation = mapLocation - 5,
            requirements = canCrossSea(tempMapLocation);
          if (!requirements) mapLocation = tempMapLocation;
          else gameMessage = requirements;

          checkEnd(tempMapLocation);
        } else {
          gameMessage = blockedPathMessages[mapLocation];
        }
        break;
      case 'east':
        if (mapLocation % 5 !== 4) {
          const tempMapLocation = mapLocation + 1,
            requirements = canCrossSea(tempMapLocation);
          if (!requirements) mapLocation = tempMapLocation;
          else gameMessage = requirements;

          checkEnd(tempMapLocation);
        } else {
          gameMessage = blockedPathMessages[mapLocation];
        }
        break;
      case 'south':
        if (mapLocation < 20) {
          const tempMapLocation = mapLocation + 5,
            requirements = canCrossSea(tempMapLocation);
          if (!requirements) mapLocation = tempMapLocation;
          else gameMessage = requirements;

          checkEnd(tempMapLocation);
        } else {
          gameMessage = blockedPathMessages[mapLocation];
        }
        break;
      case 'west':
        if (mapLocation % 5 !== 0) {
          const tempMapLocation = mapLocation - 1,
            requirements = canCrossSea(tempMapLocation);
          if (!requirements) mapLocation = tempMapLocation;
          else gameMessage = requirements;

          checkEnd(tempMapLocation);
        } else {
          gameMessage = blockedPathMessages[mapLocation];
        }
        break;
      case 'take':
        takeItem();
        break;
      case 'drop':
        dropItem();
        break;
      case 'use':
        useItem();
        break;
      case 'buy':
        takeItem('buy');
        break;
      case 'chop':
        takeItem('chop');
        break;
      default:
        gameMessage = `I don't understand that.`;
        break;
    }

    render();
  }

  function canCrossSea(location) {
    if (water.indexOf(location) > -1) {
      let requirements = [];

      if (satchel.indexOf('wood') === -1) requirements.push('a ship, ');
      if (satchel.indexOf('food') === -1) requirements.push('food, ');
      if (satchel.indexOf('weapons') === -1) requirements.push('weapons, ');

      if (requirements.length > 0) {
        if (requirements.length > 1) requirements[requirements.length - 1] = requirements[requirements.length - 1].replace(',', '');
        if (requirements.length > 2) requirements[requirements.length - 2] = requirements[requirements.length - 2].replace(',', ' and');

        return `You need ${requirements} before you can cross the perilous seas.`;
      }
    }

    return null;
  }

  function checkEnd(location) {
    if (location === theEnd) {
      gameMessage = 'THE END';
      emptyInventory();
      disableNavButtons();
      removeEventListeners();
    }
  }

  function takeItem(verb = 'take') {
    const itemIndexNumber = items.indexOf(item);

    // Does the item exist in the world and is it at player's location
    if (itemIndexNumber > -1 && itemLocations[itemIndexNumber] === mapLocation) {
      gameMessage = `You ${verb} the ${item}.`;

      satchel.push(item);

      // Remove the item from the world
      items.splice(itemIndexNumber, 1);
      itemLocations.splice(itemIndexNumber, 1);
    } else {
      gameMessage = `You can't do that.`;
    }
  }

  function dropItem() {
    if (satchel.length > 0) {
      const satchelIndexNumber = satchel.indexOf(item);

      if (satchelIndexNumber > -1) {
        gameMessage = `You drop the ${item}.`;

        // Add to satchel
        items.push(satchel[satchelIndexNumber]);
        itemLocations.push(mapLocation);

        // Remove from satchel
        satchel.splice(satchelIndexNumber, 1);
      } else {
        gameMessage = `You can't do that.`;
      }
    } else {
      gameMessage = `You're not carrying anything.`;
    }
  }

  function useItem() {
    const satchelIndexNumber = satchel.indexOf(item);

    if (satchelIndexNumber > -1) gameMessage = `You're not carrying it.`;

    if (satchel.length === 0) gameMessage += ` Your backpack is empty`;

    // If item is found in satchel
    if (satchelIndexNumber > -1) {
      switch (item) {
        case 'something':
          gameMessage = 'Some message';
          break;
        default:
          break;
      }
    }
  }

  function render() {
    // Render location
    output.innerHTML = map[mapLocation];
    image.src = `assets/${images[mapLocation]}`;

    // Display an item if there is one in this location
    for (let i = 0; i < items.length; i++) {
      if (mapLocation === itemLocations[i]) output.innerHTML += `<br>You see a <strong>${items[i]}</strong> here.`;
    }

    // Display gmae message
    output.innerHTML += `<br><em>${gameMessage}</em>`;

    // Display the satchel contents
    if (satchel.length > 0) output.innerHTML += `<br>You are carrying: ${satchel.join(', ')}`;
  }

  function init() {
    // Display the player's location
    output.innerHTML = map[mapLocation];

    addEventListeners();

    render();
  }

  function emptyInventory() {
    satchel.length = 0;
  }

  function disableNavButtons() {
    actionBtn.disabled = 'disabled';
    northBtn.disabled = 'disabled';
    eastBtn.disabled = 'disabled';
    southBtn.disabled = 'disabled';
    westBtn.disabled = 'disabled';
    input.disabled = 'disabled';
  }

  function addEventListeners() {
    actionBtn.style.cursor = 'pointer';
    actionBtn.addEventListener('click', actionClickHandler, false);
    northBtn.style.cursor = 'pointer';
    northBtn.addEventListener('click', northClickHandler, false);
    eastBtn.style.cursor = 'pointer';
    eastBtn.addEventListener('click', eastClickHandler, false);
    southBtn.style.cursor = 'pointer';
    southBtn.addEventListener('click', southClickHandler, false);
    westBtn.style.cursor = 'pointer';
    westBtn.addEventListener('click', westClickHandler, false);
    window.addEventListener('keypress', keyHandler, false);
  }

  function removeEventListeners() {
    actionBtn.removeEventListener('click', actionClickHandler, false);
    northBtn.removeEventListener('click', northClickHandler, false);
    eastBtn.removeEventListener('click', eastClickHandler, false);
    southBtn.removeEventListener('click', southClickHandler, false);
    westBtn.removeEventListener('click', westClickHandler, false);
    window.removeEventListener('keypress', keyHandler, false);
  }
  return {
    init
  };
})(window.ADVENTURE);
