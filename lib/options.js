'use strict';

exports.__esModule = true;
var options = {
  /**
   * 插入位置元素标记
   * */
  root: '#slider',
  /**
   * 当前显示图片下标
   * */
  index: 0,
  /**
   * 是否循环显示
   * */
  isLoop: false,
  /**
   * 是否自动播放
   * */
  isAuto: false,
  /**
   * 展示缩略图
   * */
  showThumb: true,
  /**
   * 图片数组
   * src必填，title选填.如下：
   * {
   *       title:'',
   *       src:''
   *  }
   */
  imgs: []
};
exports['default'] = options;
module.exports = exports['default'];