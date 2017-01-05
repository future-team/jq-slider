'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _options = require('./options');

var _options2 = _interopRequireDefault(_options);

var _templateSliderHtml = require('../template/slider.html');

var _templateSliderHtml2 = _interopRequireDefault(_templateSliderHtml);

var _templateTipHtml = require('../template/tip.html');

var _templateTipHtml2 = _interopRequireDefault(_templateTipHtml);

var Slider = (function () {
    function Slider(options) {
        _classCallCheck(this, Slider);

        this.setOpts(options, _options2['default']);
        var imgValid = this.isImgValid();
        if (imgValid) {
            this.render();
            this.bindEvent();
        }
    }

    /**
     * 获取唯一的id
     * */

    Slider.prototype.getUniqueId = function getUniqueId() {
        return 'jq' + Math.floor(Math.random() * 100);
    };

    Slider.prototype.render = function render() {
        this.addIndex();
        var sliders = _templateSliderHtml2['default'](this.opts);
        this.root.html(sliders);
        this.showThumb ? this.renderThumb() : this.renderTip();
        this.modifyStyle(this.index);
    };

    /**
     * 渲染提示
     * */

    Slider.prototype.renderTip = function renderTip() {
        var tips = _templateTipHtml2['default'](this.opts);
        _jquery2['default']('#' + this.opts.sliderId).append(tips);
    };

    /**
     * 增加标识
     * */

    Slider.prototype.addIndex = function addIndex() {
        this.opts.imgs.forEach(function (item, index) {
            item.index = index;
        });
    };

    /**
     * 渲染缩略图
     * */

    Slider.prototype.renderThumb = function renderThumb() {};

    Slider.prototype.bindEvent = function bindEvent() {
        var self = this;
        this.root.on('click', '.icon', function () {
            var dir = _jquery2['default'](this).attr('data-index'),
                max = this.opts.imgs.length - 1,
                index = self.index;
            if (dir == 'left') {
                index > 0 && (self.index = index - 1);
            } else {
                index < max && (self.index = index * 1 + 1);
            }
            self.modifyStyle(self.index);
        });
        this.root.on('click', '.tip-ul', function () {
            var indexs = _jquery2['default'](this).attr('data-index');
            if (indexs != self.index) {
                self.index = indexs;
                self.modifyStyle(self.index);
            }
            ;
        });
    };

    Slider.prototype.reFresh = function reFresh() {
        this.root.html();
        this.render();
    };

    /**
     * 根据index修正样式
     * */

    Slider.prototype.modifyStyle = function modifyStyle(index) {
        var $contet = this.root.find('.imgUl'),
            leftNum = index * 500 * -1;
        $contet.css('margin-left', leftNum + 'px');
        this.tipActive(index);
    };

    Slider.prototype.tipActive = function tipActive(index) {
        var tips = this.root.find('ol a'),
            tip = tips[index];
        tips.removeClass('active');
        _jquery2['default'](tip).addClass('active');
    };

    Slider.prototype.addItem = function addItem(obj) {
        this.opts.imgs.push(obj);
        this.reFresh();
    };

    /**
     * delete 从index下标起n个item
     * */

    Slider.prototype.delItem = function delItem(index) {
        var n = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

        this.opts.imgs.splice(index, n);
        this.index > this.opts.imgs.length - 1 && (this.index = 0);
        this.reFresh();
    };

    Slider.prototype.setOpts = function setOpts(opts, defaultOpts) {
        var options = defaultOpts;
        this.opts = _jquery2['default'].extend({}, options, opts);
        //插入标记位
        this.root = _jquery2['default'](this.opts.root);
        this.opts.length = this.opts.imgs.length;
        this.opts.sliderId = this.getUniqueId();
        this.index = this.opts.index;
    };

    /**
     * 重新设置某些属性
     * */

    Slider.prototype.resetOpts = function resetOpts(options) {
        this.setOpts(options, this.opts);
        this.reFresh();
    };

    /**
     * imgs是否存在或者为空，允许该情况的出现，
     * 不过不渲染即可
     * */

    Slider.prototype.isImgValid = function isImgValid() {
        var imgs = this.opts.imgs,
            msg = '';
        if (typeof imgs == 'undefined') {
            msg = 'imgs数组不存在';
        } else {
            msg = this.hasRequired('src', imgs);
        }
        msg && console.warn(msg);
        return !msg;
    };

    /**
     * 是否有必须元素
     * */

    Slider.prototype.hasRequired = function hasRequired(key, arr) {
        var len = arr.length,
            msg = '';
        for (var i = 0; i < len; i++) {
            if (!arr[i][key]) {
                msg = key + '不能为空';
                break;
            }
        }
        return msg;
    };

    return Slider;
})();

exports['default'] = function (opts) {
    return new Slider(opts);
};

module.exports = exports['default'];