'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('../css/index.less');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _slider = require('./slider');

var _slider2 = _interopRequireDefault(_slider);

exports.Slider = _slider2['default'];

if (typeof Slider == 'undefined') {
    window.Slider = exports['Slider'];
}

//jquery插件导出
_jquery2['default'].fn.extend({
    Slider: (function (_Slider2) {
        function Slider(_x) {
            return _Slider2.apply(this, arguments);
        }

        Slider.toString = function () {
            return _Slider2.toString();
        };

        return Slider;
    })(function (opt) {
        Slider(opt, this);
        return this;
    })
});