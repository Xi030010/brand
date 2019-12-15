module.exports = {
  /*
  ** Headers of the page
  */
  //loading: '~components/loading.vue',

  head: {
    title: '品牌研究院',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],

  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  plugins: [
        { src: '~/plugins/element-ui', ssr: true },
        { src: '~/plugins/axios', ssr: false },
        { src: '~/plugins/nuxt-quill-plugin.js', ssr: false },
        { src: '~/plugins/convertTime.js', ssr: true},
	  ],

	  babel: {
        "plugins": [
            ["component", [{
                    "libraryName": "element-ui",
                    "styleLibraryName": "theme-default"
                },
                'transform-async-to-generator',
                'transform-runtime'
            ]],

            {src: '~/store/index.js', ssr: false}
        ],
        comments: true
    },

  modules: ['@nuxtjs/axios', '@nuxtjs/proxy'],
  axios: {
    proxy: true
  },
  proxy: {
      '/api' : 'http://47.104.148.196:8081'
  },

  /*devServer: {
    proxy: {
      "/api": {
        target: "http://47.104.148.196:8081",   // 要请求的后台地址
        //ws: true,    // 启用websockets
        changeOrigin: true,    // 是否跨域
        pathRewrite: {   
          "^/api": "/"          // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替
        },
        headers: {
          referer: "http://47.104.148.196:8081"
        }
      }
    }
  },*/


  build: {
    /*
    ** Run ESLint on save
    */
  vendor: ['axios', 'vue-quill-editor'],
  //vendor: ['wangeditor'],
    /*extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }*/
  },
}

