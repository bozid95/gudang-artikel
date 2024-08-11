import Posts from "../models/postModel.js";
import Users from "../models/userModel.js";
import Categories from "../models/categoryModel.js";
import { Op } from "sequelize";

export const getPosts = async (req, res) => {
  try {
    const data = await Posts.findAll({
      attributes: ["id", "title", "content", "is_publish", "created_at"],
      include: [
        {
          model: Users,
          attributes: ["name"],
        },
        {
          model: Categories,
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, content, category, is_publish } = req.body;
  if ({ title, content, category, is_publish } == null)
    return res.status(400).json({ message: "Please fill the fields" });
  try {
    const data = await Posts.create({
      title: title,
      content: content,
      category_id: category,
      user_id: req.userId,
      is_publish: is_publish,
    });
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const data = await Posts.findOne({
      where: { id: req.params.id },
      attributes: ["id", "title", "content", "is_publish", "created_at"],
      include: [
        {
          model: Users,
          attributes: ["name"],
        },
        {
          model: Categories,
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const data = await Posts.destroy({ where: { id: req.params.id } });
    if (!data) return res.status(400).json({ message: "Post not found" });
    res.status(200).json({
      status: "success",
      message: "Post Deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const data = await Posts.findOne({ where: { id: req.params.id } });
  if (!data)
    return res.status(200).json({
      message: "Post Not Found",
    });
  const { title, content, category, is_publish } = req.body;
  if (!title || !content || !category || !is_publish)
    return res.status(400).json({ message: "Please fill the fields" });
  try {
    await Posts.update(
      {
        title: title,
        content: content,
        category_id: category,
        is_publish: is_publish,
      },
      {
        where: {
          id: data.id,
        },
      }
    );
    return res.status(200).json({
      status: "Success",
      message: "Post Updated",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchPost = async (req, res) => {
  const { q } = req.query;
  try {
    const data = await Posts.findAll({
      where: {
        title: {
          [Op.like]: `%${q}%`,
        },
      },
    });
    console.log(data);
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
