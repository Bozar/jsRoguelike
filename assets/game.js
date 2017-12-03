'use strict'
/* global ROT */
/**
 * https://standardjs.com/
 * http://www.codingcookies.com/archive/
 * http://www.j-io.org/Javascript-Naming_Conventions/
 * https://en.wikipedia.org/wiki/Naming_convention_(programming)
 * https://javascriptplayground.com/blog/2013/12/es5-getters-setters/
 * https://stackoverflow.com/a/3955124
 */

var Game = {
  _develop: false,
  _display: null,
  // create a canvas
  _currentScreen: null,
  // methods: enter, exit, render, handleInput
  _screenWidth: 80,
  _screenHeight: 20,

  get getDevelop () { return this._develop },

  set setDevelop (develop) { this._develop = develop }
}

Game.init = function () {
  // update object: _display <-- blank canvas
  // listen events: keyboard
  this._display = new ROT.Display({
    width: Game._screenWidth,
    height: Game._screenHeight
  })
  let tmpObject = this
  function bindEventToScreen (eventType) {
    window.addEventListener(eventType, function (event) {
      if (tmpObject._currentScreen !== null) {
        tmpObject._currentScreen.handleInput(eventType, event)
      }
    })
  }
  bindEventToScreen('keydown')
  bindEventToScreen('keyup')
  bindEventToScreen('keypress')
}

Game.switchScreen = function (screen) {
  // exit old screen
  if (this._currentScreen !== null) {
    this._currentScreen.exit()
    this._currentScreen.informExit()
  }
  this._display.clear()
  // draw new screen
  this._currentScreen = screen
  if (this._currentScreen !== null) {
    this._currentScreen.enter()
    this._currentScreen.render(this._display)
    this._currentScreen.informEnter()
  }
}

window.onload = function () {
  Game.setDevelop = true
  console.log('Develop Mode: ' + Game.getDevelop)
  if (ROT.isSupported()) {
    console.log('ready to go')
  } else {
    console.log('not supported!')
    return
  }

  Game.init()
  document.body.appendChild(Game._display.getContainer())
  Game.switchScreen(Game.Screen.startScreen)
}
