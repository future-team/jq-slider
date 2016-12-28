import $ from 'jquery';
import { Slider } from '../../src/index.js';
(()=>{
    let a = Slider({
        root:'#slider',
        imgs:[
            {
                title:'测试',
                src:'./src/1.jpg'
            },
            {
                title:'测试',
                src:'./src/2.jpg'
            }
        ]
    })
})()