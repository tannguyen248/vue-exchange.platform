const routes = {
  index: () => '',
  login: () => '/login',
  register: () => '/register',
  offer: (id) => `/offer/${id}`,
  exchange: (pair = 'ETH_BTC') => `exchange/${pair}`
};

export default routes;