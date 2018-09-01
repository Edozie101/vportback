require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "vport",
    dialect: "postgres"
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: "vport_test",
    dialect: "postgres"
  },
  production: {
    use_env_constiable: "DATABASE_URL",
    dialect: "postgres"
  }
}
