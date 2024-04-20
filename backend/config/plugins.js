// module.exports = ({ env }) => ({
//   // ...
//   email: {
//     config: {
//       provider: "nodemailer",
//       providerOptions: {
//         host: env("SMTP_HOST", "smtp.example.com"),
//         port: env("SMTP_PORT", 587),
//         secure: env("SMTP_SECURE", false),
//         ignoreTLS: true,
//         auth: false,

//         // ... any custom nodemailer options

//       },
//       settings: {
//         defaultFrom: "no-reply@nitp.ac.in",
//         defaultReplyTo: "no-reply@nitp.ac.in",
//       },
//     },
//   },

//   // ...
// });



module.exports = ({ env }) => ({
  // ... Other plugin configurations ...

  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        service: 'Gmail',
        auth: {
          user: 'tech.tnp@nitp.ac.in',
          pass: env("GMAIL_SMTP_PASS", "smtp.example.com"),
        },
      }
    },
    settings: {
      defaultFrom: 'no-reply@nitp.ac.in',
      defaultReplyTo: 'no-reply@nitp.ac.in',
    },
  },

  // ... Other plugin configurations ...
  'strapi-prometheus': {
    enabled: true,
    config: {
      // follow -> https://market.strapi.io/plugins/strapi-prometheus
      // add prefix to all the prometheus metrics names.
      prefix: '',

      // use full url instead of matched url
      // true  => path label: `/api/models/1`
      // false => path label: `/api/models/:id`
      fullURL: false,

      // include url query in the url label
      // true  => path label: `/api/models?limit=1`
      // false => path label: `/api/models`
      includeQuery: false,

      // metrics that will be enabled, by default they are all enabled.
      enabledMetrics: {
        koa: true, // koa metrics
        process: true, // metrics regarding the running process
        http: true, // http metrics like response time and size
        apollo: true, // metrics regarding graphql
      },

      // interval at which rate metrics are collected in ms
      interval: 10_000,

      // set custom/default labels to all the prometheus metrics
      customLabels: {
        name: "strapi-prometheus",
      },
    }
  }
});


/*

This code exports a configuration object for an email service in a Strapi app. 
The configuration is generated based on the environment variables passed in via the env argument.

The email configuration object has two main properties: config and settings. 
The config property defines the email provider and its options, 
in this case using nodemailer with various options such as the host, port, 
and secure connection settings. The settings property defines default email addresses 
for the "From" and "Reply-To" fields in outgoing emails.

*/
