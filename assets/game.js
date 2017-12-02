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

  get getDisplay () { return this._display },
  get getDevelop () { return this._develop },
  get getCurrentScreen () { return this._currentScreen },
  get getScreenWidth () { return this._screenWidth },
  get getScreenHeight () { return this._screenHeight },

  set setDevelop (develop) { this._develop = develop },
  set setDisplay (display) { this._display = display },
  set setCurrentScreen (currentScreen) { this._currentScreen = currentScreen }
}

Game.init = function () {
  // update object: _display <-- blank canvas
  // listen events: keyboard
  this.setDisplay = new ROT.Display({
    width: Game.getScreenWidth,
    height: Game.getScreenHeight
  })
  let tmpObject = this
  function bindEventToScreen (eventType) {
    window.addEventListener(eventType, function (event) {
      if (tmpObject.getCurrentScreen !== null) {
        tmpObject.getCurrentScreen.handleInput(eventType, event)
      }
    })
  }
  bindEventToScreen('keydown')
  bindEventToScreen('keyup')
  bindEventToScreen('keypress')
}

Game.switchScreen = function (screen) {
  // exit old screen
  if (this.getCurrentScreen !== null) {
    this.getCurrentScreen.exit()
  }
  this.getDisplay.clear()
  // draw new screen
  this.setCurrentScreen = screen
  if (this.getCurrentScreen !== null) {
    this.getCurrentScreen.enter()
    this.getCurrentScreen.render(this._display)
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
  document.body.appendChild(Game.getDisplay.getContainer())
  Game.switchScreen(Game.Screen.startScreen)
}
