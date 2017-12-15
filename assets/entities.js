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
      if (this.hasMixin('Attacker')) {
        this.attack(target)
        return true
      } else {
        return false
      }
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

Game.Mixins.Destructible = {
  name: 'Destructible',
  init: function () {
    this._hp = 1
  },
  takeDamage: function (attacker, damage) {
    this._hp -= damage
    if (this._hp <= 0) {
      this.getMap().removeEntity(this)
    }
  }
}

Game.Mixins.SimpleAttacker = {
  name: 'SimpleAttacker',
  groupName: 'Attacker',
  attack: function (target) {
    if (target.hasMixin('Destructible')) {
      target.takeDamage(this, 1)
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
  init: function () {
    this._growthsRemaining = 5
  },
  act: function () {
    if (this._growthsRemaining > 0 && Math.random() < 0.02) {
      let newX = this.getX() + Math.floor(Math.random() * 3 - 1)
      let newY = this.getY() + Math.floor(Math.random() * 3 - 1)
      if (this.getMap().isEmptyFloor(newX, newY)) {
        let newFungus = new Game.Entity(Game.FungusTemplate)
        newFungus.setX(newX)
        newFungus.setY(newY)
        this.getMap().addEntity(newFungus)
        this._growthsRemaining--
      }
    }
  }
}

Game.PlayerTemplate = {
  character: '@',
  mixins: [Game.Mixins.PlayerActor,
    Game.Mixins.Movealbe,
    Game.Mixins.Destructible,
    Game.Mixins.SimpleAttacker]
}

Game.FungusTemplate = {
  character: 'F',
  foreground: 'green',
  mixins: [Game.Mixins.FungusActor,
    Game.Mixins.Destructible]
}
