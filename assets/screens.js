'use strict'
/* global Game */

Game.Screen = {}

Game.Screen.start = {}
Game.Screen.start.enter = function () { console.log('enter: start') }
Game.Screen.start.exit = function () { console.log('exit: start') }
Game.Screen.start.render = function (display) {
  display.drawText(1, 1, '%c{yellow}Roguelike Javascript')
  display.drawText(1, 2, 'Press [Enter]')
}
Game.Screen.start.handleInput = function (eventType, inputKey) {
  if (eventType === 'keydown') {
    if (inputKey.code === 'Enter') {
      Game.switchScreen(Game.Screen.play)
    } else {
      console.log('start: incorrect key: ' + inputKey.code)
    }
  }
}

Game.Screen.play = {}
Game.Screen.play.enter = function () { console.log('enter: play') }
Game.Screen.play.exit = function () { console.log('exit: play') }
Game.Screen.play.render = function (display) {
  display.drawText(1, 1, 'Press [Enter] to win')
  display.drawText(1, 2, 'Press [Esc] to lose')
}
Game.Screen.play.handleInput = function (eventType, inputKey) {
  if (eventType === 'keydown') {
    if (inputKey.code === 'Enter') {
      Game.switchScreen(Game.Screen.win)
    } else if (inputKey.code === 'Escape') {
      Game.switchScreen(Game.Screen.lose)
    } else {
      console.log('play: incorrect key: ' + inputKey.code)
    }
  }
}

Game.Screen.win = {}
Game.Screen.win.enter = function () { console.log('enter: win') }
Game.Screen.win.exit = function () { console.log('exit: win') }
Game.Screen.win.render = function (display) {
  display.drawText(1, 1, 'you win')
}
Game.Screen.win.handleInput = function () {}

Game.Screen.lose = {}
Game.Screen.lose.enter = function () { console.log('enter: lose') }
Game.Screen.lose.exit = function () { console.log('exit: lose') }
Game.Screen.lose.render = function (display) {
  display.drawText(1, 1, 'you lose')
}
Game.Screen.lose.handleInput = function () {}
