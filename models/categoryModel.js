import { Sequelize } from "sequelize";
import db from "../config/db.js";

const Categories = db.define(
  "Categories",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
  }
);

export default Categories;
