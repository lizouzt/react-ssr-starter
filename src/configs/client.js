const description = "what's a nb ejs";

const appConfig = {
  baseUrl: process.env.REACT_APP_BASE_URL || 'http://localhost:9090/api/',
  seo: {
    htmlAttributes: { lang: 'en' },
    bodyAttributes: { mode: 'ssr' },
    defaultTitle: 'React SSR Site',
    titleTemplate: '%s - React SSR Site',
    meta: [
      {
        name: 'keywords',
        content: 'woooooooooooo',
      },
      {
        name: 'description',
        content: description,
      },
    ],
  },
};

export default appConfig;
