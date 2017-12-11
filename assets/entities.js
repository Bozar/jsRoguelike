'use strict'
/* global Game */

Game.Mixins = {}

Game.Mixins.Movealbe = {
  name: 'Movealbe',
  tryMove: function (x, y, map) {
    let tile = map.getTile(x, y)
    if (tile.isWalkable()) {
      this._x = x
      this._y = y
      return true
    } else if (tile.isDiggable()) {
      map.dig(x, y)
      return true
    } else {
      return false
    }
  }
}

Game.PlayerTemplate = {
  character: '@',
  mixins: [Game.Mixins.Movealbe]
}
