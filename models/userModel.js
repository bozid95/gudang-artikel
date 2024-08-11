import { Sequelize } from "sequelize";
import db from "../config/db.js";

const Users = db.define(
  "Users",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
    underscored: true,
  }
);

export default Users;
