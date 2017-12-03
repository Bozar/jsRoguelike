'use strict'
/* global Game */

Game.Screen = function (screenType) {
  this._screenType = screenType
}

Game.Screen.prototype.informEnter = function () {
  if (Game.getDevelop) {
    console.log('Enter: ' + this._screenType)
  }
}
Game.Screen.prototype.informExit = function () {
  if (Game.getDevelop) {
    console.log('Exit: ' + this._screenType)
  }
}
Game.Screen.prototype.enter = function () { }
Game.Screen.prototype.exit = function () { }
Game.Screen.prototype.render = function () { }
Game.Screen.prototype.handleInput = function () { }

Game.Screen.startScreen = new Game.Screen('start')

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

Game.Screen.playScreen = new Game.Screen('play')
Game.Screen.playScreen._map = null

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

Game.Screen.winScreen = new Game.Screen('win')
Game.Screen.winScreen.render = function (display) {
  display.drawText(1, 1, 'you win')
}

Game.Screen.loseScreen = new Game.Screen('lose')
Game.Screen.loseScreen.render = function (display) {
  display.drawText(1, 1, 'you lose')
}
