export const state = () => ({
    testiContent: [],
    searchTestiContent: []
});
export const mutations = {
    addTesti(state, value) {
      state.testiContent.push(value);
    },

    gettingTesti(state, value) {
        state.testiContent = value
    },

    editTesti(state, value) {

        for (var i in state.testiContent) {
            if (state.testiContent[i].id == value.id) {
                state.testiContent[i] = value.data;
               break;
            }
        }
    },

    deleteTesti(state, value) {
      let arr = state.testiContent
      let removeIndex = arr.map(function(item) { return item.id; }).indexOf(value);
      arr.splice(removeIndex, 1);
    },

    fetchTesti(state, value){
      state.searchTestiContent = value
    },

    searchTesti(state, value) {
      let searchState = state.testiContent

      if (value != '' && value) {
        searchState = searchState.filter((item) => {
              return item.name
                .toUpperCase()
                .includes(value.toUpperCase())
            })
          state.searchTestiContent = searchState
          }else if (value == ''){
            state.searchTestiContent = state.testiContent
          }
    },
};
export const actions = {

    // Getting Data
    nuxtServerInit(vuexContext, value) {
        const target =  this.$fire.firestore.collection('testiContent')
        return target.get()
        .then(res=> {
            let testiArray = []

            res.forEach((doc) => {
              testiArray.push({...doc.data(), id:doc.id  })
            });

            vuexContext.commit("gettingTesti", testiArray);
            vuexContext.commit("fetchTesti", testiArray);

            //console.log(testiArray)


        }).catch( (e)=> {
            console.log(e)
        })
    },

    // Adding Data
    addTesti(vuexContext, value) {
      const target =  this.$fire.firestore.collection('testiContent')
      target.doc().set(value)
      .then(res => {
        vuexContext.commit("addTesti", value);
      })
      .catch( (e)=> {
        console.log(e)
      })
    },

    // Editing Data
    editTesti(vuexContext, value) {
        const target =  this.$fire.firestore.collection('testiContent')
        target.doc(value.id).update(value)
        .then(res => {
            vuexContext.commit("editTesti", {data: value, id: value.id});
        })
        .catch( (e)=> {
            console.log(e)
        })
    },

    // Deleting Data
    deleteTesti(vuexContext, value) {
        const target =  this.$fire.firestore.collection('testiContent')
        target.doc(value).delete()
        .then(res => {
            vuexContext.commit("deleteTesti", value);
        })
        .catch( (e)=> {
            console.log(e)
        })
    },

    // Search Data
    searchTesti(vuexContext, value){
      vuexContext.commit("searchTesti", value);
    }

  };
  export const getters = {
    testiContent(state) {
      return state.testiContent;
    },
    searchTestiContent(state) {
      return state.searchTestiContent;
    },
  };