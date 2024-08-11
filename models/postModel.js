import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db.js";
import Users from "./userModel.js";
import Categories from "./categoryModel.js";

const Posts = db.define(
  "Posts",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPublish: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
    underscored: true,
  }
);

Users.hasMany(Posts);
Posts.belongsTo(Users, { foreignKey: "user_id" });

Categories.hasOne(Posts);
Posts.belongsTo(Categories, { foreignKey: "category_id" });

export default Posts;
