import '../css/index.less';
import $ from 'jquery';
export Slider from './slider';
if(typeof(Slider) == 'undefined'){
    window.Slider = exports['Slider'];
}

//jquery插件导出
$.fn.extend({
    Slider:function(opt){
        Slider(opt,this);
        return this;
    }
});