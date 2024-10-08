import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import piniaStore from './store';

import '@/styles/index.less';
import 'uno.css';
import './styles/custom-theme.less'; // 引入自定义主题样式
// 支持SVG
import 'virtual:svg-icons-register';
import '@arco-design/web-vue/dist/arco.css';

// elementUI
import 'element-plus/dist/index.css';

// import { ThemeServiceInit, devuiDarkTheme } from 'devui-theme';
import Idux from '@/config/idux';

// const themeService = ThemeServiceInit({ devuiDarkTheme }, 'infinityTheme');

// themeService?.applyTheme(devuiDarkTheme);

//vue3的挂载方式
const app = createApp(App);

app.use(router);
app.use(piniaStore);
app.use(Idux);
import '@/styles/reset.less';

app.mount('#app');
