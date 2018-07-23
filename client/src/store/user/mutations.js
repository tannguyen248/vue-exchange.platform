export const setUser = (state, payload) => {
  state.id = payload.id;
  state.addresses = payload.addresses;
};
