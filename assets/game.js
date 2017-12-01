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
  _develop: null,
  _display: null,
  // create a canvas
  _currentScreen: null,
  // methods: enter, exit, render, handleInput

  get getDisplay () { return this._display },
  get getDevelop () { return this._develop },
  set setDevelop (develop) { this._develop = develop }
}

Game.init = function () {
  // update object: _display <-- blank canvas
  // listen events: keyboard
  this._display = new ROT.Display({ width: 80, height: 20 })
  // this._display = new ROT.Display({ width: 80, height: 20 })
  let game = this
  function bindEventToScreen (eventType) {
    window.addEventListener(eventType, function (event) {
      if (game._currentScreen !== null) {
        game._currentScreen.handleInput(eventType, event)
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
  }
  this._display.clear()
  // draw new screen
  this._currentScreen = screen
  if (this._currentScreen !== null) {
    this._currentScreen.enter()
    this._currentScreen.render(this._display)
  }
}

window.onload = function () {
  Game.setDevelop = true
  // Game.setDevelop = false
  console.log('Develop Mode: ' + Game.getDevelop)
  if (ROT.isSupported()) {
    console.log('ready to go')
  } else {
    console.log('not supported!')
    return
  }

  Game.init()
  document.body.appendChild(Game.getDisplay.getContainer())
  Game.switchScreen(Game.Screen.start)
}
