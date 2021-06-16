
  export const state = () => ({
    assistanceContent: [],
    searchAssistanceContent: []
  });
  export const mutations = {
    addAssistance(state, value) {
      state.assistanceContent.push(value);
    },

    gettingAssistance(state, value) {
        state.assistanceContent = value
    },

    editAssistance(state, value) {

        for (var i in state.assistanceContent) {
            if (state.assistanceContent[i].id == value.id) {
                state.assistanceContent[i] = value.data;
               break;
            }
        }
    },

    deleteAssistance(state, value) {
      let arr = state.assistanceContent
      let removeIndex = arr.map(function(item) { return item.id; }).indexOf(value);
      arr.splice(removeIndex, 1);
    },

    fetchAssistance(state, value){
      state.searchAssistanceContent = value
    },

    searchAssistance(state, value) {
      let searchState = state.assistanceContent

      if (value != '' && value) {
        searchState = searchState.filter((item) => {
              return item.title
                .toUpperCase()
                .includes(value.toUpperCase())
            })
          state.searchAssistanceContent = searchState
          }else if (value == ''){
            state.searchAssistanceContent = state.assistanceContent
          }
    },
  };
  export const actions = {

    // Getting Data
    nuxtServerInit(vuexContext, value) {
        const target =  this.$fire.firestore.collection('assistanceContent')
        return target.get()
        .then(res=> {
            let assistanceArray = []

            res.forEach((doc) => {
               assistanceArray.push({...doc.data(), id:doc.id })
            });

            vuexContext.commit("gettingAssistance", assistanceArray);
            vuexContext.commit("fetchAssistance", assistanceArray);

            //console.log(assistanceArray)


        }).catch( (e)=> {
            console.log(e)
        })
    },

    // Adding Data
    addAssistance(vuexContext, value) {
      const target =  this.$fire.firestore.collection('assistanceContent')
      target.doc().set(value)
      .then(res => {
        vuexContext.commit("addAssistance", value);
      })
      .catch( (e)=> {
        console.log(e)
      })
    },

    // Editing Data
    editAssistance(vuexContext, value) {
        const target =  this.$fire.firestore.collection('assistanceContent')
        target.doc(value.id).update(value)
        .then(res => {
            vuexContext.commit("editAssistance", {data: value, id: value.id});
        })
        .catch( (e)=> {
            console.log(e)
        })
    },

    // Deleting Data
    deleteAssistance(vuexContext, value) {
        const target =  this.$fire.firestore.collection('assistanceContent')
        target.doc(value).delete()
        .then(res => {
            vuexContext.commit("deleteAssistance", value);
        })
        .catch( (e)=> {
            console.log(e)
        })
    },

    // Search Data
    searchAssistance(vuexContext, value){
      vuexContext.commit("searchAssistance", value);
    }

  };
  export const getters = {
    assistanceContent(state) {
      return state.assistanceContent;
    },
    searchAssistanceContent(state) {
      return state.searchAssistanceContent;
    },
    assistanceLength(state) {
      return state.searchAssistanceContent.length
    }
  };

