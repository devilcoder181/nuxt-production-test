export const state = () => ({
    enquiryContent: [],
    searchEnquiryContent: []
  });
  export const mutations = {

    gettingEnquiry(state, value) {
        state.enquiryContent = value
    },

    deleteEnquiry(state, value) {
      let arr = state.enquiryContent
      let removeIndex = arr.map(function(item) { return item.id; }).indexOf(value);
      arr.splice(removeIndex, 1);
    },

    fetchEnquiry(state, value){
      state.searchEnquiryContent = value
    },

    searchEnquiry(state, value) {
      let searchState = state.enquiryContent

      if (value != '' && value) {
        searchState = searchState.filter((item) => {
              return item.title
                .toUpperCase()
                .includes(value.toUpperCase())
            })
          state.searchEnquiryContent = searchState
          }else if (value == ''){
            state.searchEnquiryContent = state.enquiryContent
          }
    },

    makeActive(state, value) {

        for (var i in state.enquiryContent) {
            if (state.enquiryContent[i].id == value) {
                state.enquiryContent[i].isActive = true;
               break;
            }
        }
    }
  };
  export const actions = {

    // Getting Data
    nuxtServerInit(vuexContext, value) {
        const target =  this.$fire.firestore.collection('enquiryContent')
        return target.get()
        .then(res=> {
            let EnquiryArray = []

            res.forEach((doc) => {
               EnquiryArray.push({...doc.data(), id:doc.id })
            });

            vuexContext.commit("gettingEnquiry", EnquiryArray);
            vuexContext.commit("fetchEnquiry", EnquiryArray);

            //console.log(EnquiryArray)


        }).catch( (e)=> {
            console.log(e)
        })
    },

    makeActive(vuexContext, value) {
        const target =  this.$fire.firestore.collection('enquiryContent')
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
    deleteEnquiry(vuexContext, value) {
        const target =  this.$fire.firestore.collection('enquiryContent')
        target.doc(value).delete()
        .then(res => {
            vuexContext.commit("deleteEnquiry", value);
        })
        .catch( (e)=> {
            console.log(e)
        })
    },

    // Search Data
    searchEnquiry(vuexContext, value){
      vuexContext.commit("searchEnquiry", value);
    }

  };
  export const getters = {
    enquiryContent(state) {
      return state.enquiryContent;
    },
    searchEnquiryContent(state) {
      return state.searchEnquiryContent;
    },
    enquiryLength(state) {
      return state.searchEnquiryContent.length
    }
  };
