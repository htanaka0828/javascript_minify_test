/**
 * class
 * @constructor
 */
var TreasureBox = function() {
  this.init.call(this);
};

/**
 * 初期設定
 * it`s init method
 */
TreasureBox.prototype.init = function() {
  this._itemArr = [
    '\\',
    '$',
    '&',
    '#',
    '!',
    '%',
    '^',
    '|',
    '*',
    '@'];

  this._treasureCount = 0;
  this._tresureBox = this._getBox(0);
};


/**
 * @return {Array} .
 */
TreasureBox.prototype.getTresureBox = function() {
  return this._tresureBox;
};


/**
 * @param {number} count .
 * @return {boolean} .
 */
TreasureBox.prototype.checkTresureCount = function(count) {
  return this._treasureCount === count;
};


/**
 * @param {number} depth 階層の深さ
 * @return {Array} tresureBox 宝箱
 */
TreasureBox.prototype._getBox = function (depth) {
  var maxCol, key, item;
  var tresureBox = [];
  depth = parseInt(depth, 10);
  for(var i = 0; i < 100; i++) {
    maxCol = 10;
    if(depth < 5) {
      maxCol = 11;
    }
    key = Math.floor(Math.random() * maxCol);
    if(key === 10) {
      item = this._getBox(depth + 1);
    } else {
      item = this._itemArr[key];
      if(item === '\\' || item === '$') {
        this._treasureCount++;
      }
    }
    tresureBox.push(item);
  }
  return tresureBox;
}
