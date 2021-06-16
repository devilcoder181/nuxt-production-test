export const state = () => ({
    galleryImage: [],
});

export const mutations = {
    addImage(state, value) {
        state.galleryImage.push(value);
    },

    gettingImage(state, value) {
        state.galleryImage = value
    },

    deleteImage(state, value) {
        let arr = state.galleryImage
        let removeIndex = arr.map(function(item) { return item.id; }).indexOf(value);
        arr.splice(removeIndex, 1);
    },

};
export const actions = {

    // Getting Data
    nuxtServerInit(vuexContext, value) {
        const target =  this.$fire.firestore.collection('galleryImage')
        return target.get()
        .then(res=> {
            let galleryArray = []

            res.forEach((doc) => {
                galleryArray.push({...doc.data(), id:doc.id })
            });

            vuexContext.commit("gettingImage", galleryArray);

        }).catch( (e)=> {
            console.log(e)
        })
    },

    // Adding Data
    addImage(vuexContext, value) {
      const target =  this.$fire.firestore.collection('galleryImage')
      target.doc().set(value)
      .then(res => {
        vuexContext.commit("addImage", value);
      })
      .catch( (e)=> {
        console.log(e)
      })
    },

    // Deleting Data
    deleteImage(vuexContext, value) {
        const target =  this.$fire.firestore.collection('galleryImage')
        target.doc(value).delete()
        .then(res => {
            vuexContext.commit("deleteImage", value);
        })
        .catch( (e)=> {
            console.log(e)
        })
    },

  };
  export const getters = {
    galleryImage(state) {
      return state.galleryImage;
    },
  };