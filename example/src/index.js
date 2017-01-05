import $ from 'jquery';
import { Slider } from '../../src/index.js';
(()=>{
    let a = Slider({
        root:'#slider',
        imgs:[
            {
                title:'测试1',
                src:'./src/1.jpg'
            },
            {
                title:'测试2',
                src:'./src/2.jpg'
            }
        ],
        index:1
    })
    $('.tip').on('click',()=>{
        /*a.addItem({
            title:'测试3',
            src:'./src/2.jpg'
        });*/
        //a.delItem(0)
        a.resetOpts({
            index:0
        })
    })
})()