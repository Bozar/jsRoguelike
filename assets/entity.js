'use strict'
/* global Game */

// Functions:
// Create: a constructor for non-enviroment blocks

Game.Entity = function (properties) {
  properties = properties || {}
  Game.Glyph.call(this, properties)
  this._name = properties.name || ''
  this._x = properties.x || 0
  this._y = properties.y || 0
  this._map = null

  // mixins = [mixin0, mixin1, ...]
  // mixin = {
  //   name: '',
  //   newProperty: '',
  //   init: function () {}
  // }
  this._attachedMixins = {
    // mixinName: true
  }
  this._attachedMixinGroups = {}
  let mixins = properties.mixins || []
  for (const mixinObject of mixins) {
    for (const key in mixinObject) {
      if (key !== 'name' && key !== 'init' && !this.hasOwnProperty(key)) {
        this[key] = mixinObject[key]
      }
    }
    this._attachedMixins[mixinObject.name] = true
    if (mixinObject.groupName) {
      this._attachedMixinGroups[mixinObject.groupName] = true
    }
    if (mixinObject.init) {
      mixinObject.init.call(this, properties)
    }
  }
}

Game.Entity.extend(Game.Glyph)

Game.Entity.prototype.hasMixin = function (check) {
  if (typeof check === 'object') {
    return this._attachedMixins[check.name]
  } else {
    return this._attachedMixins[check] || this._attachedMixinGroups[check]
  }
}
Game.Entity.prototype.getName = function () { return this._name }
Game.Entity.prototype.getX = function () { return this._x }
Game.Entity.prototype.getY = function () { return this._y }
Game.Entity.prototype.getMap = function () { return this._map }

Game.Entity.prototype.setName = function (name) { this._name = name }
Game.Entity.prototype.setX = function (x) { this._x = x }
Game.Entity.prototype.setY = function (y) { this._y = y }
Game.Entity.prototype.setMap = function (map) { this._map = map }
