'use strict'
/* global Game */

Game.Glyph = function (character, foreground, background) {
  // Draw anything that can appear on a map grid
  this._character = character || ' '
  this._foreground = foreground || 'white'
  this._background = background || 'black'
}

Game.Glyph.prototype.getCharacter = function () { return this._character }
Game.Glyph.prototype.getForeground = function () { return this._foreground }
Game.Glyph.prototype.getBackground = function () { return this._background }
