import { Sequelize } from "sequelize";
import env from "dotenv";
env.config();

const db = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    logging: true,
  }
);

//test connection
db.authenticate()
  .then(() => {
    console.log("Database Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

//generate table
(async () => {
  await db.sync({ alter: true, force: false });
})();

export default db;
