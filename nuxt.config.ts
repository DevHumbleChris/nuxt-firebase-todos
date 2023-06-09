// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-vuefire", "@nuxtjs/tailwindcss", "@tailvue/nuxt"],
  vuefire: {
    config: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
    },
    auth: true
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css'
  }
});
