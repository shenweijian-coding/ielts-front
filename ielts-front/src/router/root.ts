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
    path: '/walkman',
    name: 'walkman',
    meta: {
      title: '爱听写-随身听',
    },
    component: () => import('@/views/home/walkman.vue'),
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
      },
      {
        path: 'vocabularyBook',
        meta: {
          belong: '/main/user'
        },
        component: () => import('@/views/vocabularyBook/index.vue'),
      },
      {
        path: 'vocabularyBookDetail',
        meta: {
          belong: '/main/user'
        },
        component: () => import('@/views/vocabularyBook/detail/index.vue'),
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
  {
    path: '/jc',
    name: 'joinClass',
    meta: {
      title: '爱听写-加入班级',
    },
    component: () => import('@/views/enterprise/join-class.vue'),
  },
  {
    path: '/company',
    name: 'company',
    meta: {
      title: '爱听写-企业相关',
    },
    children: [{
      path: 'applicat',
      component: () => import('@/views/enterprise/companyInfo.vue')
    },{
      path: 'invite',
      component: () => import('@/views/enterprise/invite.vue')
    },{
      path: 'join',
      component: () => import('@/views/enterprise/join.vue')
    },{
      path: 'index',
      component: () => import('@/views/enterprise/layout.vue'),
      children: [{
        path: 'class',

        component: () => import('@/views/enterprise/index/class/index.vue')  
      },{
        path: 'classDetail',
        meta: {
          belong: '/company/index/class',
        },
        component: () => import('@/views/enterprise/index/class/detail.vue')  
      },{
        path: 'library',
        component: () => import('@/views/enterprise/index/library/index.vue')  
      },{
        path: 'user',
        component: () => import('@/views/enterprise/index/user/index.vue')  
      },{
        path: 'memberlist',
        meta: {
          belong: '/company/index/user',
        },
        component: () => import('@/views/enterprise/index/member/index.vue')  
      }]
    }]
  }
];
