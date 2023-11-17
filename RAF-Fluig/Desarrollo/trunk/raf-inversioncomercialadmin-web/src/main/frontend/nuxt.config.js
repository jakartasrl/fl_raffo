import colors from 'vuetify/es5/util/colors'

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

export default {
  mode: 'spa',
  /*
   */
  head: {
    titleTemplate: '%s - Admin Portal Servicios',
    title: 'Admin Portal RAFFO',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Admin Portal Servicios'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  manifest: {
    name: 'Admin Portal Servicios',
    short_name: 'Admin Portal Servicios',
    description: 'Admin Portal de Servicios de RAFFO',
	lang: 'es'
  },  
  
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/repository.js'],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
	'@nuxtjs/dotenv',
	'@nuxtjs/proxy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // '@nuxtjs/pwa',
    // '@nuxtjs/auth',
    ['@nuxtjs/moment', { locales: ['es'], defaultLocale: 'es' }],
    '@nuxtjs/toast'
  ],
  
  proxy: {
    '/raf-inversioncomercial-backend/api': process.env.PROXY_BASE_URL || '/raf-inversioncomercial-backend/api',
  },  
  
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
	baseURL: process.env.API_BASE_URL || '/raf-inversioncomercial-backend/api'
  },
  /*
   * Auth options 
   
  auth: {
	redirect: {
	  login: '/login',
	  home: '/',
	},
	strategies: {
	   local: {
	     endpoints: {
	       login: { url: 'login', method: 'get' },
	       user: { url: 'me', method: 'get', propertyName: 'data' },
	       logout: false,   
	       tokenRequired: false
	     }
	   }
	},
	plugins: ['~/plugins/auth'],
  },  
  */
  router: {
	base: process.env.BASE_URL || '/raf-inversioncomercialadmin-web/',
	// Default middleware for all routes
    middleware: []
  },  
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },
  toast: {
      position: 'bottom-right',
      duration: 2000,
      keepOnHover: true,
      icon: 'mdi-information-outline',
      iconPack: 'mdi',
      theme: "toasted-primary",
      action : {
    	  text: 'Close',
          // icon: 'mdi-close-circle-outline',
          onClick : (e, toastObject) => {
              toastObject.goAway(0);
          }
      },      
 /*     register: [ // Register custom toasts
        {
          name: 'my-error',
          message: 'Oops...Something went wrong',
          options: {
            type: 'error'
          }
        }
      ] */
  },
  
  server: {
    port: process.env.DEV_SERVER_PORT || 3000, 
	host: process.env.DEV_SERVER_HOST || 'localhost'
  },  
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
