export const state = () => ({
    seoContent: []
});
export const mutations = {
  setSeo(state, abtposts) {
    state.seoContent = abtposts;
  },

  updateSeo(state, payload) {
    for (var i in state.seoContent) {
      if (state.seoContent[i].id == payload.id) {
          state.seoContent[i] = payload.data;
         break;
      }
    }
  },

  addSeo(state, value) {
    state.seoContent.push(value);
  },
};
export const actions = {
    // Getting SEO Datas

    // Updating SEO Content
    // Loading Contact Contents
    nuxtServerInit(vuexContext, context) {
      const target =  this.$fire.firestore.collection('seo')
      return target.get()
      .then(res=> {
        let seoArray = []

        res.forEach((doc) => {
          seoArray.push({...doc.data(), id:doc.id })
        });

        vuexContext.commit("setSeo", seoArray);

        //console.log(assistanceArray)


      }).catch( (e)=> {
          console.log(e)
      })
    },

    updateSeo(vuexContext, payload) {
      const target =  this.$fire.firestore.collection('seo')
      target.doc(payload.doc).update(payload.value)
      .then(res => {
        vuexContext.commit("updateSeo", {data: payload, id: payload.dov});
      })
      .catch( (e)=> {
        console.log(e)
      })
    },

    // Adding Data
    addSeo(vuexContext, payload) {
      const target =  this.$fire.firestore.collection('seo')
      target.doc(payload.doc).set(payload.value)
      .then(res => {
        vuexContext.commit("addSeo", payload);
      })
      .catch( (e)=> {
        console.log(e)
      })
    },

  };

  export const getters = {
    seoContent(state) {
      return state.seoContent;
    },
  };
