export default [
  {
    path: '/',
    name: 'index',
    meta: {
      title: '爱听写',
    },
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '爱听写',
    },
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '爱听写',
    },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/gallery',
    name: 'gallery',
    meta: {
      title: '爱听写',
    },
    component: () => import('@/views/gallery/index.vue'),
  },
  {
    path: '/errorBook',
    name: 'errorBook',
    meta: {
      title: '爱听写',
    },
    component: () => import('@/views/errorBook/index.vue'),
  },
  {
    path: '/forgetPassword',
    name: 'forgetPassword',
    meta: {
      title: '爱听写',
    },
    component: () => import('@/views/forgetPassword/index.vue'),
  },
];
