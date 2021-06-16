export const state = () => ({
    programContent: [],
    searchProgramContent: []
});
export const mutations = {
    addProgram(state, value) {
      state.programContent.push(value);
    },

    gettingProgram(state, value) {
        state.programContent = value
    },

    editProgram(state, value) {

        for (var i in state.programContent) {
            if (state.programContent[i].id == value.id) {
                state.programContent[i] = value.data;
               break;
            }
        }
    },

    deleteProgram(state, value) {
      let arr = state.programContent
      let removeIndex = arr.map(function(item) { return item.id; }).indexOf(value);
      arr.splice(removeIndex, 1);
    },

    fetchProgram(state, value){
      state.searchProgramContent = value
    },

    searchProgram(state, value) {
      let searchState = state.programContent

      if (value != '' && value) {
        searchState = searchState.filter((item) => {
              return item.title
                .toUpperCase()
                .includes(value.toUpperCase())
            })
          state.searchProgramContent = searchState
          }else if (value == ''){
            state.searchProgramContent = state.programContent
          }
    },
};
export const actions = {

    // Getting Data
    nuxtServerInit(vuexContext, value) {
        const target =  this.$fire.firestore.collection('programContent')
        return target.get()
        .then(res=> {
            let programArray = []

            res.forEach((doc) => {
              programArray.push({...doc.data(), id:doc.id})
            });

            vuexContext.commit("gettingProgram", programArray);
            vuexContext.commit("fetchProgram", programArray);

            //console.log(assistanceArray)


        }).catch( (e)=> {
            console.log(e)
        })
    },

    // Adding Data
    addProgram(vuexContext, value) {
      const target =  this.$fire.firestore.collection('programContent')
      target.doc().set(value)
      .then(res => {
        vuexContext.commit("addProgram", value);
      })
      .catch( (e)=> {
        console.log(e)
      })
    },

    // Editing Data
    editProgram(vuexContext, value) {
        const target =  this.$fire.firestore.collection('programContent')
        target.doc(value.id).update(value)
        .then(res => {
            vuexContext.commit("editProgram", {data: value, id: value.id});
        })
        .catch( (e)=> {
            console.log(e)
        })
    },

    // Deleting Data
    deleteProgram(vuexContext, value) {
        const target =  this.$fire.firestore.collection('programContent')
        target.doc(value).delete()
        .then(res => {
            vuexContext.commit("deleteProgram", value);
        })
        .catch( (e)=> {
            console.log(e)
        })
    },

    // Search Data
    searchProgram(vuexContext, value){
      vuexContext.commit("searchProgram", value);
    }

  };
  export const getters = {
    programContent(state) {
      return state.programContent;
    },
    searchProgramContent(state) {
      return state.searchProgramContent;
    },
    programLength(state) {
      return state.searchProgramContent.length
    }
  };
