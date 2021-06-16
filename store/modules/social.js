
  export const state = () => ({
    socialContent: [],
  });
  export const mutations = {

    setSocialContent(state, abtposts) {
      state.socialContent = abtposts;
    },

    updateSocialContent(state, abtposts) {
      state.socialContent = abtposts;
    },

  };
  export const actions = {

    // Loading Contact Contents
    nuxtServerInit(vuexContext, context) {
      const target =  this.$fire.firestore.collection('socialContent').doc('socialData')
      return target.get()
      .then(res=> {
        vuexContext.commit("setSocialContent", res.data());
      }).catch( (e)=> {
        console.log(e)
      })

    },


    setSocialContent(vuexContext, abtposts) {
      vuexContext.commit("setSocialContent", abtposts);
      //console.log(vuexContext)
    },

    updateSocialContent(vuexContext, abtposts) {
      const target =  this.$fire.firestore.collection('socialContent')
      target.doc('socialData').update(abtposts)
      .then(res => {
        vuexContext.commit("updateSocialContent", abtposts);
      })
      .catch( (e)=> {
        console.log(e)
      })
    },

  };
  export const getters = {
    socialContent(state) {
      return state.socialContent;
    },
  };

