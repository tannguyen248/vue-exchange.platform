import routePath from './routePaths';

export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      {
        path: routePath.index(),
        component: () => import('pages/index')
      },
      {
        path: routePath.exchange(':pair'),
        component: () => import('pages/Exchange')
      },
      {
        path: routePath.offer(':id'),
        component: () => import('pages/ExchangeTrading'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: routePath.register(),
        component: () => import('pages/SignUp')
      },
      {
        path: routePath.login(),
        component: () => import('pages/SignIn')
      }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
