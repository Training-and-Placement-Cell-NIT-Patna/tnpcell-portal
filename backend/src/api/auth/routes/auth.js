module.exports = {
  routes: [
    {
      method: 'PUT',
      path: '/auth/reset-password',
      handler: 'auth.reset_password',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/auth/userid',
      handler: 'auth.get_userid',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};

// ex: shiftwidth=2 expandtab:
