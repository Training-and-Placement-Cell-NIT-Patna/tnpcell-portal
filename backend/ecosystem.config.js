module.exports = {
    apps: [
      {
        name: 'tnp-backend',
        script: 'npm',
        args: 'start',
        env: {
          NODE_ENV: 'production',
          DATABASE_HOST: 'localhost',
          DATABASE_PORT: '5432',
          DATABASE_NAME: process.env.DATABASE_NAME,
          DATABASE_USERNAME: process.env.DATABASE_NAME,
          DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
        },
      },
    ],
  };