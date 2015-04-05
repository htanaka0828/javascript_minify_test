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
  var ans = this.getTresuerCount(Box.getTresureBox());
  if(!Box.checkTresureCount(ans)) {
    alert('間違い！');
  }
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
