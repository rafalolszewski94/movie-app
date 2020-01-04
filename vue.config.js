module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          $env: '${process.env.NODE_ENV}';
          @import "@/styles/_variables.scss";
          @import "@/styles/_mixins.scss";
        `
      }
    }
  }
};
