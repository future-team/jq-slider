import $ from 'jquery';
import opts from './options';
import sliderTpl from '../template/slider.html';
import tipTpl from '../template/tip.html';
class Slider{
    constructor(options){
        this.resetOpts(options,opts);
        let imgValid = this.isImgValid();
        this.opts.length = this.opts.imgs.length;
        this.opts.sliderId = this.getUniqueId();
        this.render();
        imgValid && this.bindEvent();
    }
    /**
     * 获取唯一的id
     * */
    getUniqueId() {
        return 'jq' + Math.floor(Math.random() * 100);
    }
    render(){
        let sliders = sliderTpl(this.opts);
        this.root.html(sliders);
        this.showThumb ? this.renderThumb() : this.renderTip();
    }
    /**
     * 渲染提示
     * */
    renderTip(){
       let tips = tipTpl(this.opts);
       this.root.append(tips);
    }
    /**
     * 渲染缩略图
     * */
    renderThumb(){

    }
    bindEvent(){

    }
    reFresh(){
        this.root.html();
        this.render();
    }
    countIndex(){

    }
    saveImg(){
        this._img = this.opts.imgs;
    }
    addItem(obj){
        this.opts.imgs.push(obj);
        this.reFresh()
    }
    /**
     * delete 从index下标起n个item
     * */
    delItem(index,n = 1){
        this.opts.imgs.splice(index,n);
        this.reFresh()
    }
    resetOpts(opts,defaultOpts){
        let options = defaultOpts;
        this.opts = $.extend({}, options, opts);
        //插入标记位
        this.root = $(this.opts.root);
    }
    /**
     * 重新设置某些属性
     * */
    setOpts(options){
        this.resetOpts(options,this.opts);
    }
    /**
     * imgs是否存在或者为空，允许该情况的出现，
     * 不过不渲染即可
     * */
    isImgValid(){
        let imgs = this.opts.imgs,
            msg = '';
        if(typeof (imgs) == 'undefined' ){
            msg = 'imgs数组不存在';
        }else{
            msg = this.hasRequired('src',imgs);
        }
        msg && console.warn(msg);
        return !msg;
    }
    /**
     * 是否有必须元素
     * */
    hasRequired(key,arr){
        let len = arr.length,
            msg = '';
        for(var i = 0;i<len;i++){
            if(!arr[i][key]){
                msg = `${key}不能为空`;
                break;
            }
        }
        return msg;
    }
}
export default (opts)=>{
    return new Slider(opts);
}