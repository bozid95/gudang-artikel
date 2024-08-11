import { Sequelize } from "sequelize";
import db from "../config/db.js";

const Users = db.define(
  "Users",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
  }
);

export default Users;
