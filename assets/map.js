'use strict'
/* global ROT Game */

// Functions:
// Create: a two-dimension array filled with 0s and 1s

Game.Map = function (tiles, player) {
  // tiles: 2D array, [[column 1], [column 2], ...]
  this._tiles = tiles
  this._width = tiles.length
  this._height = tiles[0].length
  this._entities = []
  this._scheduler = new ROT.Scheduler.Simple()
  this._engine = new ROT.Engine(this._scheduler)
  this.addEntityAtRandomPosition(player)
  for (let i = 0; i < 50; i++) {
    this.addEntityAtRandomPosition(new Game.Entity(Game.FungusTemplate))
  }
}

Game.Map.prototype.dig = function (x, y) {
  if (this.getTile(x, y).isDiggable()) {
    this._tiles[x][y] = Game.Tile.floorTile
  }
}

Game.Map.prototype.isEmptyFloor = function (x, y) {
  return this.getTile(x, y) === Game.Tile.floorTile &&
    !this.getEntityAt(x, y)
}

Game.Map.prototype.addEntity = function (entity) {
  if (entity.getX() >= 0 && entity.getX() <= this._width &&
    entity.getY() >= 0 && entity.getY() <= this._height) {
    entity.setMap(this)
    this._entities.push(entity)
    if (entity.hasMixin('Actor')) {
      this._scheduler.add(entity, true)
    }
  }
}

Game.Map.prototype.removeEntity = function (entity) {
  for (let i = 0; i < this._entities.length; i++) {
    if (this._entities[i] === entity) {
      this._entities.splice(i, 1)
      break
    }
  }
  if (entity.hasMixin('Actor')) {
    this._scheduler.remove(entity)
  }
}

Game.Map.prototype.getRandomFloorPosition = function () {
  let x, y
  do {
    x = Math.floor(Math.random() * this._width)
    y = Math.floor(Math.random() * this._height)
  } while (!this.isEmptyFloor(x, y))
  return { x: x, y: y }
}

Game.Map.prototype.addEntityAtRandomPosition = function (entity) {
  let position = this.getRandomFloorPosition()
  entity.setX(position.x)
  entity.setY(position.y)
  this.addEntity(entity)
}

Game.Map.prototype.getWidth = function () { return this._width }
Game.Map.prototype.getHeight = function () { return this._height }
Game.Map.prototype.getTile = function (x, y) {
  if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
    return Game.Tile.nullTile
  } else {
    return this._tiles[x][y] || Game.Tile.nullTile
  }
}
Game.Map.prototype.getEngine = function () { return this._engine }
Game.Map.prototype.getEntities = function () { return this._entities }
Game.Map.prototype.getEntityAt = function (x, y) {
  for (const i of this._entities) {
    if (i.getX() === x && i.getY() === y) {
      return i
    }
  }
  return false
}
