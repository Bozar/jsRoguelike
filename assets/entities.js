'use strict'
/* global Game */

// Functions:
// Create: non-enviroment blocks and related mixins

Game.Mixins = {}

Game.Mixins.Movealbe = {
  name: 'Movealbe',
  tryMove: function (x, y, map) {
    let tile = map.getTile(x, y)
    let target = map.getEntityAt(x, y)
    if (target) {
      return false
    } else if (tile.isWalkable()) {
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

Game.Mixins.PlayerActor = {
  name: 'PlayerActor',
  groupName: 'Actor',
  act: function () {
    Game.redrawScreen()
    this.getMap().getEngine().lock()
  }
}

Game.Mixins.FungusActor = {
  name: 'FungusActor',
  groupName: 'Actor',
  act: function () { }
}

Game.PlayerTemplate = {
  character: '@',
  mixins: [Game.Mixins.Movealbe, Game.Mixins.PlayerActor]
}

Game.FungusTemplate = {
  character: 'F',
  foreground: 'green',
  mixins: [Game.Mixins.FungusActor]
}
