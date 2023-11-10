module.exports = ({ env }) => ({
  host: env('HOST', '192.168.1.42'),
  port: env.int('PORT', 1337),
  app: {
 keys: env.array('APP_KEYS'),
 keys: env.array("APP_KEYS", ["testKey1", "testKey2"]),
  },
});

// module.exports = ({ env }) => ({
//   host: env('HOST', '0.0.0.0'),
//   port: env.int('PORT', 1337),
//   app: {
//     keys: env.array('APP_KEYS'),
//   },
// });


/*

This is a JavaScript code that exports a function, taking an object with an "env" property as its argument. 
The function returns an object with three properties:

host: The value of the environment variable "HOST", or "0.0.0.0" if the environment variable is not set.

port: The integer representation of the environment variable "PORT", or 1337 if the environment variable is not set.

app: An object with a property "keys", which is an array created from the environment variable "APP_KEYS". 
If the environment variable is not set, the default value of the array is ["testKey1", "testKey2"].

The purpose of the code is to provide a configuration object for an application, 
taking into consideration environment variables.

*/