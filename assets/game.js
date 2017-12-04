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
  _develop: true,
  _display: null,
  // create a canvas
  _currentScreen: null,
  // methods: enter, exit, render, handleInput
  _screenWidth: 80,
  _screenHeight: 20,
  _mapWidth: 200,
  _mapHeight: 200,
  _cellIterations: 4,
  _cellSurvive: 0.5,
  // _floorIsCell: true,
  _floorIsCell: false,

  get getDevelop () {
    this._develop = this._develop === true
    return this._develop
  },
  get getScreenWidth () { return this._screenWidth },
  get getScreenHeight () { return this._screenHeight },
  get getMapWidth () { return this._mapWidth },
  get getMapHeight () { return this._mapHeight },
  get getCellIterations () { return this._cellIterations },
  get getCellSurvive () { return this._cellSurvive },
  get getFloorIsCell () { return this._floorIsCell }
}

Game.convertBoolToNum = function (boolValue) {
  return boolValue === true ? 1 : 0
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
    this._currentScreen.informText('Exit screen')
  }
  this._display.clear()
  // draw new screen
  this._currentScreen = screen
  if (this._currentScreen !== null) {
    this._currentScreen.enter()
    this._currentScreen.render(this._display)
    this._currentScreen.informText('Enter screen')
  }
}

window.onload = function () {
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
