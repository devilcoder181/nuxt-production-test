
  export const state = () => ({
    showLoader: false
  });
  export const mutations = {
    activateLoader(state, check) {
        state.showLoader = check;
    },
  };
  export const getters = {
    showLoader(state) {
      return state.showLoader;
    },
  };

