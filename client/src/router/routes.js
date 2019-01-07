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
        path: routePath.register(),
        component: () => import('pages/SignUp')
      },
      {
        path: routePath.login(),
        component: () => import('pages/SignIn')
      },
      {
        path: routePath.offer(':id'),
        component: () => import('pages/ExchangeTrading'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: routePath.deposits(),
        component: () => import('pages/Deposit'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: routePath.withdrawal(),
        component: () => import('pages/Withdrawal'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: routePath.profile(),
        component: () => import('pages/Profile'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: routePath.kyc(),
        component: () => import('pages/KYC'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
];
