import Vue from 'vue'
import '../theme/index.css'

// 全部引用，此时需要在nuxt.config.js中设置css
// if (process.BROWSER_BUILD) {
//     Vue.use(require('element-ui'))
// }
//import element from 'element-ui';
//Vue.use('element')
Vue.use(require('element-ui'))

// 按需引用
// import { Button } from 'element-ui';
// Vue.component(Button.name, Button);
