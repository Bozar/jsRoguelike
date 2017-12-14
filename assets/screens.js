'use strict'
/* global ROT, Game */

// Functions:
// Communicate:
//    player's input --> Game.Screen --> process the game data
//    redraw the screen <-- Game.Screen <-- new game data

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
Game.Screen.playScreen._player = null
// Game.Screen.playScreen._centerX = 0
// Game.Screen.playScreen._centerY = 0

Game.Screen.playScreen.create2DArray = function () {
  let map = []
  for (let x = 0; x < Game.getMapWidth; x++) {
    map.push([])
    for (let y = 0; y < Game.getMapHeight; y++) {
      map[x].push(Game.Tile.nullTile)
    }
  }
  return map
}

Game.Screen.playScreen.createCellularCave = function (mapArray) {
  let generator = new ROT.Map.Cellular(Game.getMapWidth, Game.getMapHeight)
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

Game.Screen.playScreen.moveScreenCenter = function (dX, dY) {
  // 0 <= center.x + dX <= map.width
  // this._centerX = Math.max(0, this._centerX + dX)
  // this._centerX = Math.min(this._centerX, this._map.getWidth() - 1)
  // this._centerY = Math.max(0, this._centerY + dY)
  // this._centerY = Math.min(this._centerY, this._map.getHeight() - 1)
  let newX = this._player.getX() + dX
  let newY = this._player.getY() + dY
  this._player.tryMove(newX, newY, this._map)
}

Game.Screen.playScreen.getTopLeftCoordinate = function () {
  /**
     * map: a big square or rectangle in the fixed position
     * screen: a small, moving window
     *
     * use this equation to get screen.left:
     *  screen.left + screen.width/2 = screen.center
     *
     * boundary condition: screen moves out of the window
     *  0 <= screen.left <= map.width - screen.width
     *  <==> screen.left = max((screen.center - screen.width/2), 0)
     *  <==> screen.left = min(screen.left, (map.width - screen.width))
     */

  let topLeftX = 0
  topLeftX = this._player.getX() - Game.getScreenWidth / 2
  topLeftX = Math.max(0, topLeftX)
  topLeftX = Math.min(topLeftX, this._map.getWidth() - Game.getScreenWidth)

  let topLeftY = 0
  topLeftY = this._player.getY() - Game.getScreenHeight / 2
  topLeftY = Math.max(0, topLeftY)
  topLeftY = Math.min(topLeftY, this._map.getHeight() - Game.getScreenHeight)

  return [topLeftX, topLeftY]
}

Game.Screen.playScreen.enter = function () {
  let map = Game.Screen.playScreen.create2DArray()
  map = Game.Screen.playScreen.createCellularCave(map)

  this._player = new Game.Entity(Game.PlayerTemplate)
  this._map = new Game.Map(map, this._player)
  let startPosition = this._map.getRandomFloorPosition()
  this._player.setX(startPosition.x)
  this._player.setY(startPosition.y)

  this._map.getEngine().start()
}

Game.Screen.playScreen.render = function (display) {
  let topLeftCoordinate = Game.Screen.playScreen.getTopLeftCoordinate()
  let topLeftX = topLeftCoordinate[0]
  let topLeftY = topLeftCoordinate[1]
  let entities = this._map.getEntities()

  for (let x = topLeftX; x < topLeftX + Game.getScreenWidth; x++) {
    for (let y = topLeftY; y < topLeftY + Game.getScreenHeight; y++) {
      // let glyph = this._map.getTile(x, y).getGlyph()
      let tile = this._map.getTile(x, y)
      display.draw(
        x - topLeftX, y - topLeftY,
        tile.getCharacter(), tile.getForeground(), tile.getBackground()
      )
    }
  }

  // display.draw(
  //   this._player.getX() - topLeftX, this._player.getY() - topLeftY,
  //   this._player.getCharacter()
  // )

  for (const i of entities) {
    if (i.getX() >= topLeftX && i.getX() < topLeftX + Game.getScreenWidth &&
      i.getY() >= topLeftY && i.getY() < topLeftY + Game.getScreenHeight) {
      display.draw(
        i.getX() - topLeftX,
        i.getY() - topLeftY,
        i.getCharacter(),
        i.getForeground(),
        i.getBackground()
      )
    }
  }

  this.informText('Map drawn')
  this.informText('Press [Enter] to win')
  this.informText('Press [Esc] to lose')
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

      case 'ArrowLeft':
        Game.Screen.playScreen.moveScreenCenter(-1, 0)
        break
      case 'ArrowRight':
        Game.Screen.playScreen.moveScreenCenter(1, 0)
        break
      case 'ArrowUp':
        Game.Screen.playScreen.moveScreenCenter(0, -1)
        break
      case 'ArrowDown':
        Game.Screen.playScreen.moveScreenCenter(0, 1)
        break

      default:
        this.informText('Incorrect key: ' + inputKey.code)
        break
    }
    this._map.getEngine().unlock()
    // this.informText('Cursor: ' + this._centerX + ', ' + this._centerY)
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
