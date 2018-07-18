const routes = {
  index: () => '',
  login: () => '/login',
  register: () => '/register',
  offer: (id) => `/offer/${id}`,
  exchange: (pair) => `exchange/${pair}`
};

export default routes;
