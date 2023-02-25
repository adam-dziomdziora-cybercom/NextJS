module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    endpoint: process.env.endpoint,
    key: process.env.key,
    database: process.env.database,
    container: process.env.container, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    baseUrl: process.env.baseUrl,
  },
};
