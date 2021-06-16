export const state = () => ({
    contactContent: [],
    searchContactContent: []
  });
  export const mutations = {

    gettingContact(state, value) {
        state.contactContent = value
    },

    deleteContact(state, value) {
      let arr = state.contactContent
      let removeIndex = arr.map(function(item) { return item.id; }).indexOf(value);
      arr.splice(removeIndex, 1);
    },

    fetchContact(state, value){
      state.searchContactContent = value
    },

    searchContact(state, value) {
      let searchState = state.contactContent

      if (value != '' && value) {
        searchState = searchState.filter((item) => {
              return item.title
                .toUpperCase()
                .includes(value.toUpperCase())
            })
          state.searchContactContent = searchState
          }else if (value == ''){
            state.searchContactContent = state.contactContent
          }
    },

    makeActive(state, value) {

        for (var i in state.contactContent) {
            if (state.contactContent[i].id == value) {
                state.contactContent[i].isActive = true;
               break;
            }
        }
    }
  };
  export const actions = {

    // Getting Data
    nuxtServerInit(vuexContext, value) {
        const target =  this.$fire.firestore.collection('contactContent')
        return target.get()
        .then(res=> {
            let ContactArray = []

            res.forEach((doc) => {
               ContactArray.push({...doc.data(), id:doc.id })
            });

            vuexContext.commit("gettingContact", ContactArray);
            vuexContext.commit("fetchContact", ContactArray);

            //console.log(ContactArray)


        }).catch( (e)=> {
            console.log(e)
        })
    },

    makeActive(vuexContext, value) {
        const target =  this.$fire.firestore.collection('contactContent')
        target.doc(value).update({isActive: true})
        .then(res => {
             vuexContext.commit("makeActive", value);
            // console.log('working')
            console.log(value)
        })
        .catch( (e)=> {
            console.log(e)
        })
    },

    // Deleting Data
    deleteContact(vuexContext, value) {
        const target =  this.$fire.firestore.collection('contactContent')
        target.doc(value).delete()
        .then(res => {
            vuexContext.commit("deleteContact", value);
        })
        .catch( (e)=> {
            console.log(e)
        })
    },

    // Search Data
    searchContact(vuexContext, value){
      vuexContext.commit("searchContact", value);
    }

  };
  export const getters = {
    contactContent(state) {
      return state.contactContent;
    },
    searchContactContent(state) {
      return state.searchContactContent;
    },
    contactLength(state) {
      return state.searchContactContent.length
    }
  };
