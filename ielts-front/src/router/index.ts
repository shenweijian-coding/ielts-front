import { createRouter, createWebHistory } from 'vue-router/auto';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';

const routesWhiteList = ['/login', '/'];

//导入生成的路由数据
const router = createRouter({
  history: createWebHistory(),
});

router.beforeEach(async (_to, _from, next) => {
  const user = useUserStore();
  console.log(user);

  const hasToken = !!user.token || getToken();
  console.log(hasToken);

  if (hasToken) {
    if (_to.path === '/login') {
      next('/home');
    } else {
      NProgress.start();
      next();
    }
  } else {
    if (routesWhiteList.includes(_to.path)) {
      next();
    } else {
      next({ path: '/login', replace: true });
    }
  }
});

router.afterEach((_to) => {
  NProgress.done();
});

export default router;
