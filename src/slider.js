import $ from 'jquery';
import opts from './options';
import sliderTpl from '../template/slider.html';
import tipTpl from '../template/tip.html';
class Slider {
    constructor(options) {
        this.setOpts(options, opts);
        let imgValid = this.isImgValid();
        if (imgValid) {
            this.render();
            this.bindEvent();
        }
    }

    /**
     * 获取唯一的id
     * */
    getUniqueId() {
        return 'jq' + Math.floor(Math.random() * 100);
    }

    render() {
        this.addIndex();
        let sliders = sliderTpl(this.opts);
        this.root.html(sliders);
        this.showThumb ? this.renderThumb() : this.renderTip();
        this.modifyStyle(this.index);
    }

    /**
     * 渲染提示
     * */
    renderTip() {
        let tips = tipTpl(this.opts);
        $('#' + this.opts.sliderId).append(tips);
    }

    /**
     * 增加标识
     * */
    addIndex() {
        this.opts.imgs.forEach((item, index)=> {
            item.index = index
        })
    }

    /**
     * 渲染缩略图
     * */
    renderThumb() {

    }

    bindEvent() {
        let self = this;
        this.root.on('click', '.icon', function () {
            let dir = $(this).attr('data-index'),
                max = this.opts.imgs.length - 1,
                index = self.index;
            if (dir == 'left') {
                index > 0 && ( self.index = index - 1 );
            } else {
                index < max && ( self.index = index * 1 + 1 );
            }
            self.modifyStyle(self.index);
        });
        this.root.on('click', '.tip-ul', function () {
            let indexs = $(this).attr('data-index');
            if (indexs != self.index) {
                self.index = indexs;
                self.modifyStyle(self.index)
            }
            ;
        })
    }

    reFresh() {
        this.root.html();
        this.render();
    }

    /**
     * 根据index修正样式
     * */
    modifyStyle(index) {
        let $contet = this.root.find('.imgUl'),
            leftNum = index * 500 * -1;
        $contet.css('margin-left', leftNum + 'px');
        this.tipActive(index);
    }

    tipActive(index) {
        let tips = this.root.find('ol a'),
            tip = tips[index];
        tips.removeClass('active');
        $(tip).addClass('active');
    }
    addItem(obj) {
        this.opts.imgs.push(obj);
        this.reFresh()
    }

    /**
     * delete 从index下标起n个item
     * */
    delItem(index, n = 1) {
        this.opts.imgs.splice(index, n);
        (this.index > this.opts.imgs.length -1) &&(this.index = 0);
        this.reFresh()
    }

    setOpts(opts, defaultOpts) {
        let options = defaultOpts;
        this.opts = $.extend({}, options, opts);
        //插入标记位
        this.root = $(this.opts.root);
        this.opts.length = this.opts.imgs.length;
        this.opts.sliderId = this.getUniqueId();
        this.index = this.opts.index;
    }

    /**
     * 重新设置某些属性
     * */
    resetOpts(options) {
        this.setOpts(options, this.opts);
        this.reFresh();
    }

    /**
     * imgs是否存在或者为空，允许该情况的出现，
     * 不过不渲染即可
     * */
    isImgValid() {
        let imgs = this.opts.imgs,
            msg = '';
        if (typeof (imgs) == 'undefined') {
            msg = 'imgs数组不存在';
        } else {
            msg = this.hasRequired('src', imgs);
        }
        msg && console.warn(msg);
        return !msg;
    }

    /**
     * 是否有必须元素
     * */
    hasRequired(key, arr) {
        let len = arr.length,
            msg = '';
        for (var i = 0; i < len; i++) {
            if (!arr[i][key]) {
                msg = `${key}不能为空`;
                break;
            }
        }
        return msg;
    }
}
export default (opts)=> {
    return new Slider(opts);
}