export const setUser = (state, payload) => {
  state.id = payload.id;
  state.addresses = payload.addresses;
  state.profile = payload.profile;
  state.verificationStatus = payload.verificationStatus;
};

export const setProfile = (state, payload) => {
  state.profile = payload.profile;
};
