'use strict'
/* global Game */

Game.Glyph = function (properties) {
  // Draw anything that can appear on a map grid
  properties = properties || {}
  this._character = properties.character || ' '
  this._foreground = properties.foreground || 'white'
  this._background = properties.background || 'black'
}

Game.Glyph.prototype.getCharacter = function () { return this._character }
Game.Glyph.prototype.getForeground = function () { return this._foreground }
Game.Glyph.prototype.getBackground = function () { return this._background }
