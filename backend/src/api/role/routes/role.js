module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/role/me',
     handler: 'role.get_role',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
