import { createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI, { autocompleteEmits } from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'

import * as ElIcons from '@element-plus/icons-vue'

// 获取屏幕宽高
// app.prototype.getViewportSize = function() {
// 	return {
// 	  width: document.documentElement.clientWidth || document.body.clientWidth ||  window.innerWidth,
// 	  height: document.documentElement.clientHeight || document.body.clientHeight ||  window.innerHeight
// 	};
//   };


const app = createApp(App)
for (const name in ElIcons){
	app.component(name,(ElIcons as any)[name])
}

app.config.globalProperties.getViewportSize = function() {
	return {
	  width: document.documentElement.clientWidth || document.body.clientWidth ||  window.innerWidth,
	  height: document.documentElement.clientHeight || document.body.clientHeight ||  window.innerHeight
	};
};
app.config.globalProperties.$ajax = axios;

app.use(store).use(router).use(ElementUI).mount('#app')
