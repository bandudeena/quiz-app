const config = {
  development: {
    client: "mysql",
    connection: {
      // host: "127.0.0.1",
      // user: "root",
      // password: "root",
      // database: "quiz_service",
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB,
    },
    useNullAsDefault: true,
  },
};

export default config;
