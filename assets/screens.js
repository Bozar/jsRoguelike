'use strict'
/* global ROT, Game */

Game.Screen = function (screenType) {
  this._screenType = screenType
}

Game.Screen.prototype.informText = function (debugMessage) {
  if (Game.getDevelop) {
    console.log(this._screenType + ': ' + debugMessage)
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
      this.informText('Incorrect key: ' + inputKey.code)
    }
  }
}

Game.Screen.playScreen = new Game.Screen('play')
Game.Screen.playScreen._map = null

Game.Screen.playScreen.create2DArray = function () {
  let map = []
  for (let x = 0; x < Game.getScreenWidth; x++) {
    map.push([])
    for (let y = 0; y < Game.getScreenHeight; y++) {
      map[x].push(Game.Tile.nullTile)
    }
  }
  return map
}
Game.Screen.playScreen.createCellularCave = function (mapArray) {
  let generator = new ROT.Map.Cellular(Game.getScreenWidth, Game.getScreenHeight)
  generator.randomize(Game.getCellSurvive)
  for (let i = 0; i < Game.getCellIterations; i++) {
    generator.create()
  }
  let boolFloorIsCell = Game.convertBoolToNum(Game.getFloorIsCell)
  generator.connect(function (x, y, cellIsAlive) {
    if (cellIsAlive === boolFloorIsCell) {
      mapArray[x][y] = Game.Tile.floorTile
    } else {
      mapArray[x][y] = Game.Tile.wallTile
    }
  }, boolFloorIsCell)
  return mapArray
}

Game.Screen.playScreen.enter = function () {
  let map = Game.Screen.playScreen.create2DArray()
  map = Game.Screen.playScreen.createCellularCave(map)
  this._map = new Game.Map(map)
}
Game.Screen.playScreen.render = function (display) {
  // display.drawText(1, 1, 'Press [Enter] to win')
  // display.drawText(1, 2, 'Press [Esc] to lose')
  for (let x = 0; x < this._map.getWidth(); x++) {
    for (let y = 0; y < this._map.getHeight(); y++) {
      let glyph = this._map.getTile(x, y).getGlyph()
      display.draw(x, y,
        glyph.getCharacter(), glyph.getForeground(), glyph.getBackground())
    }
  }
  this.informText('Map drawn')
}
Game.Screen.playScreen.handleInput = function (eventType, inputKey) {
  if (eventType === 'keydown') {
    switch (inputKey.code) {
      case 'Enter':
        Game.switchScreen(Game.Screen.winScreen)
        break
      case 'Escape':
        Game.switchScreen(Game.Screen.loseScreen)
        break
      case 'Space':
        Game.switchScreen(Game.Screen.playScreen)
        break
      default:
        this.informText('Incorrect key: ' + inputKey.code)
        break
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
