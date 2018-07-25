const routes = {
  index: () => '',
  login: () => '/login',
  register: () => '/register',
  offer: (id) => `/offer/${id}`,
  exchange: (pair = 'ETH_BTC') => `/exchange/${pair}`,
  deposits: () => '/deposits',
  profile: () => '/profile',
  kyc: () => '/kyc'
};

export default routes;
