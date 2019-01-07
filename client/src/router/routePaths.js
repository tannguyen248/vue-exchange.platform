const routes = {
  index: () => '',
  login: () => '/login',
  register: () => '/register',
  offer: (id) => `/offer/${id}`,
  exchange: (pair = 'ETH_BTC') => `/exchange/${pair}`,
  deposits: () => '/deposits',
  withdrawal: () => '/withdrawal',
  profile: () => '/profile',
  kyc: () => '/kyc'
};

export default routes;
