
  export const state = () => ({
    bannerContent: []
  });
  export const mutations = {

    fetchBanner(state, value){
      state.bannerContent = value
    }

  };
  export const actions = {

    // Loading Contact Contents
    nuxtServerInit(vuexContext, context) {
      const target2 =  this.$fire.firestore.collection('bannerContent').doc('bannerText')
      return target2.get()
      .then(res=> {
        vuexContext.commit("fetchBanner", res.data());
      }).catch( (e)=> {
        console.log(e)
      })
      
    },

    editBanner(vuexContext, value){
      const target =  this.$fire.firestore.collection('bannerContent')
      target.doc('bannerText').update(value)
      .then(res => {
        vuexContext.commit("fetchBanner", value);
      })
      .catch( (e)=> {
        console.log(e)
      })
    }
  };
  export const getters = {
    bannerContent(state) {
      return state.bannerContent;
    },
  };

