import { createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';
import routes from './root'
const routesWhiteList = ['/login', '/', '/forgetPassword', '/stop'];

//导入生成的路由数据
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach(async (_to, _from, next) => {
  const user = useUserStore();
  
  const hasToken = !!user.token || getToken()
  console.log(hasToken);

  if (hasToken) {
    if (_to.path === '/login') {
      next({path: '/main', replace: true});
    } else {
      NProgress.start();
      next();
    }
  } else {
    if (routesWhiteList.includes(_to.path)) {
      next();
    } else {
      // 如果用户未登录且尝试访问非登录页，存储目标URL并重定向到登录页
      if(_to.name != 'login') {
        localStorage.setItem('redirectUrl', _to.fullPath);
      }
      next({ path: '/login', replace: true });
    }
  }
});

router.afterEach((_to) => {
  NProgress.done();
});

export default router;
