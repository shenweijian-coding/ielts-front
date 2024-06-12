export default [
  {
    path: '/',
    name: 'index',
    meta: {
      title: '爱听写-首页',
    },
    component: () => import('@/views/index.vue'),
  },
  // {
  //   path: '/stop',
  //   name: 'stop',
  //   meta: {
  //     title: '爱听写-维护',
  //   },
  //   component: () => import('@/views/stop/index.vue'),
  // },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '爱听写-听写页',
    },
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '爱听写-登录',
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/gallery',
    name: 'gallery',
    redirect: '/main/book',
    meta: {
      title: '爱听写-书籍页',
    }
  },
  {
    path: '/main',
    redirect: '/main/book',
    meta: {
      title: '爱听写-书籍页',
    },
    component: () => import('@/views/gallery/index.vue'),
    children: [
      {
        path: 'book',
        component: () => import('@/views/gallery/book/index.vue')
      },
      {
        path: 'statistics',
        component: () => import('@/views/statistics/index.vue')
      },
      {
        path: 'errorBook',
        component: () => import('@/views/errorBook/index.vue'),
      },
      {
        path: 'user',
        component: () => import('@/views/user/index.vue'),
      }
    ],
  },
  {
    path: '/errorBook',
    name: 'errorBook',
    meta: {
      title: '爱听写-错误本',
    },
    component: () => import('@/views/errorBook/index.vue'),
  },
  {
    path: '/forgetPassword',
    name: 'forgetPassword',
    meta: {
      title: '爱听写-忘记密码',
    },
    component: () => import('@/views/forgetPassword/index.vue'),
  },
];
