import createApp from './app.js'

import authService from './service.auth.js'
import firestoreService from './service.firestore.js'
import storageService from './service.storage.js'

const appConfig = {"apiKey":"AIzaSyDMkjSdCNGCldWgWWCdQPwat-mLAojcSdw","authDomain":"pingo-rianair-2f72e.firebaseapp.com","projectId":"pingo-rianair-2f72e","storageBucket":"pingo-rianair-2f72e.appspot.com","messagingSenderId":"273896716312","appId":"1:273896716312:web:13cf68da448f23564ceb6d","measurementId":"G-6TV65CMWTB"}

export default async (ctx, inject) => {
  const { firebase, session } = await createApp(appConfig, ctx)

  let servicePromises = []

  if (process.server) {
    servicePromises = [
      authService(session, firebase, ctx, inject),
    firestoreService(session, firebase, ctx, inject),
    storageService(session, firebase, ctx, inject),

    ]
  }

  if (process.client) {
    servicePromises = [
      authService(session, firebase, ctx, inject),
      firestoreService(session, firebase, ctx, inject),
      storageService(session, firebase, ctx, inject),

    ]
  }

  const [
    auth,
    firestore,
    storage
  ] = await Promise.all(servicePromises)

  const fire = {
    auth: auth,
    firestore: firestore,
    storage: storage
  }

    inject('fireModule', firebase)
    ctx.$fireModule = firebase

  inject('fire', fire)
  ctx.$fire = fire
}

function forceInject (ctx, inject, key, value) {
  inject(key, value)
  const injectKey = '$' + key
  ctx[injectKey] = value
  if (typeof window !== "undefined" && window.$nuxt) {
  // If clause makes sure it's only run when ready() is called in a component, not in a plugin.
    window.$nuxt.$options[injectKey] = value
  }
}