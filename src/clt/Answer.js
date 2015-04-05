goog.provide('Answer');

goog.require('TreasureBox');



/**
 * @constructor
 */
var Answer = function() {
  this.init.call(this);
};


Answer.prototype.init = function() {
  var Box = new TreasureBox();
  this.target = document.getElementById('target');
  var ans = this.getTresuerCount(Box.getTresureBox());
  if(Box.checkTresureCount(ans)) {
    this.log('正解！');
  } else {
    this.log('間違い！');
  }
};


/**
 * @param {string} log .
 */
Answer.prototype.log = function(log) {
  var p = document.createElement('p');
  p.innerText = log;
  this.target.appendChild(p);
};

/**
 * @param {Array} obj
 * @return {number} .
 */
Answer.prototype.getTresuerCount = function(obj) {
  var num = 0;
  for(var i = 0, len = obj.length; i < len; i++) {
    if(Object.prototype.toString.call(obj[i]) === '[object Array]') {
      num += this.getTresuerCount(obj[i]);
    } else if(obj[i] === '\\' || obj[i] === '$') {
      num++;
    }
  }
  return num;
};

for(var i = 0; i < 10; i++) {
  new Answer();
}
