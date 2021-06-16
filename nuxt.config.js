module.exports = {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt-production',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/firebase',
  ],

  buildDir: 'nuxt',

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv'
  ],

  firebase: {
    // ...
    config: {
      apiKey: "AIzaSyDMkjSdCNGCldWgWWCdQPwat-mLAojcSdw",
      authDomain: "pingo-rianair-2f72e.firebaseapp.com",
      projectId: "pingo-rianair-2f72e",
      storageBucket: "pingo-rianair-2f72e.appspot.com",
      messagingSenderId: "273896716312",
      appId: "1:273896716312:web:13cf68da448f23564ceb6d",
      measurementId: "G-6TV65CMWTB"
    },
    services: {  
      auth: {
        initialize: {
          onAuthStateChangedAction: 'onAuthStateChanged',
        },
        ssr: true,
        emulatorPort: isDev && useEmulators ? 9099 : undefined,
        disableEmulatorWarnings: false,
      },
      firestore: {
        memoryOnly: false,
        enablePersistence: true,
        emulatorPort: isDev && useEmulators ? 8080 : undefined,
      },
      functions: {
        emulatorPort: isDev && useEmulators ? 12345 : undefined,
      },
      storage: true,
      database: {
        emulatorPort: isDev && useEmulators ? 9000 : undefined,
      },
      performance: false,
      analytics: false,
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
