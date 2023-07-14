// const path = require('path');


// module.exports = ({ env }) => ({
//   connection: {
//     client: 'sqlite',
//     connection: {
//       filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
//     },
//     useNullAsDefault: true,
//   },
// });

module.exports = ({ env }) => ({
      connection: {
        client: 'postgres',
        connection: {
          host: env('DATABASE_HOST', 'localhost'),
          port: env.int('DATABASE_PORT', 5432),
          database: env('DATABASE_NAME', 'tnp-test'),
          user: env('DATABASE_USERNAME', 'postgres'),
          password: env('DATABASE_PASSWORD', '2006001'),
          schema: env('DATABASE_SCHEMA', 'public'), // Not required
          // ssl: {
          //   rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
          // },
        },
        debug: false,
      },
    });

/*


The code is a configuration file in Node.js that exports a function 

that returns an object that defines the database connection settings. 

The function takes in an argument env, which is an object that allows access to the environment variables.

The returned object sets the client for the database connection to SQLite and sets the connection settings 
to use a file named data.db located in a .tmp directory within the same directory as this configuration file.
  
If the environment variable DATABASE_FILENAME is set, the code uses that value instead of the default file name.

The useNullAsDefault property is set to true, indicating that SQLite should use NULL as the default value for

new columns that don't have a specified default value.

*/
