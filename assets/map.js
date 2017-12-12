'use strict'
/* global Game */

Game.Map = function (tiles) {
  // tiles: 2D array, [[column 1], [column 2], ...]
  this._tiles = tiles
  this._width = tiles.length
  this._height = tiles[0].length
}

Game.Map.prototype.dig = function (x, y) {
  if (this.getTile(x, y).isDiggable()) {
    this._tiles[x][y] = Game.Tile.floorTile
  }
}

Game.Map.prototype.getRandomFloorPosition = function () {
  let x, y
  do {
    x = Math.floor(Math.random() * this._width)
    y = Math.floor(Math.random() * this._height)
  } while (this.getTile(x, y) !== Game.Tile.floorTile)
  return {x: x, y: y}
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
