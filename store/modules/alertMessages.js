
  export const state = () => ({
    showAlert: false,
    errAlert: false
  });
  export const mutations = {
    activateAlert(state, check) {
        state.showAlert = check;
        setTimeout(()=> {
            state.showAlert = false;
        },2000)
    },
    activateErrAlert(state, check) {
      state.errAlert = check;
      setTimeout(()=> {
          state.errAlert = false;
      },2000)
  },
    
  };
  export const getters = {
    showAlert(state) {
      return state.showAlert;
    },
    errAlert(state) {
      return state.errAlert;
    },
  };

