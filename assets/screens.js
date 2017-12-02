'use strict'
/* global Game */

Game.Screen = function () { }
Game.Screen.prototype.enter = function () { }
Game.Screen.prototype.exit = function () { }
Game.Screen.prototype.render = function () { }
Game.Screen.prototype.handleInput = function () { }

Game.Screen.startScreen = new Game.Screen()
Game.Screen.startScreen.enter = function () { console.log('enter: start') }
Game.Screen.startScreen.exit = function () { console.log('exit: start') }
Game.Screen.startScreen.render = function (display) {
  display.drawText(1, 1, '%c{yellow}Roguelike Javascript')
  display.drawText(1, 2, 'Press [Enter]')
}
Game.Screen.startScreen.handleInput = function (eventType, inputKey) {
  if (eventType === 'keydown') {
    if (inputKey.code === 'Enter') {
      Game.switchScreen(Game.Screen.playScreen)
    } else {
      console.log('start: incorrect key: ' + inputKey.code)
    }
  }
}

Game.Screen.playScreen = new Game.Screen()
Game.Screen.playScreen.enter = function () { console.log('enter: play') }
Game.Screen.playScreen.exit = function () { console.log('exit: play') }
Game.Screen.playScreen.render = function (display) {
  display.drawText(1, 1, 'Press [Enter] to win')
  display.drawText(1, 2, 'Press [Esc] to lose')
}
Game.Screen.playScreen.handleInput = function (eventType, inputKey) {
  if (eventType === 'keydown') {
    if (inputKey.code === 'Enter') {
      Game.switchScreen(Game.Screen.winScreen)
    } else if (inputKey.code === 'Escape') {
      Game.switchScreen(Game.Screen.loseScreen)
    } else {
      console.log('play: incorrect key: ' + inputKey.code)
    }
  }
}

Game.Screen.winScreen = new Game.Screen()
Game.Screen.winScreen.enter = function () { console.log('enter: win') }
Game.Screen.winScreen.exit = function () { console.log('exit: win') }
Game.Screen.winScreen.render = function (display) {
  display.drawText(1, 1, 'you win')
}

Game.Screen.loseScreen = new Game.Screen()
Game.Screen.loseScreen.enter = function () { console.log('enter: lose') }
Game.Screen.loseScreen.exit = function () { console.log('exit: lose') }
Game.Screen.loseScreen.render = function (display) {
  display.drawText(1, 1, 'you lose')
}
