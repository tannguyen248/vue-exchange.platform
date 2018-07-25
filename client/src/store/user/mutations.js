export const setUser = (state, payload) => {
  state.id = payload.id;
  state.addresses = payload.addresses;
};

export const setProfile = (state, payload) => {
  state.profile = payload.profile;
};
