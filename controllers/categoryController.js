import { where } from "sequelize";
import Categories from "../models/categoryModel.js";

export const getCategory = async (req, res) => {
  try {
    const data = await Categories.findAll();
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const data = await Categories.findOne({ where: { id: req.params.id } });
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { name } = req.body;
  const category_exist = await Categories.findOne({ where: { name: name } });
  if (category_exist)
    return res.status(400).json({
      message: "Category already exist",
    });
  if (!name) {
    return res.status(400).json({
      message: "Please Fill the Fields",
    });
  }
  try {
    await Categories.create({
      name: name,
    });
    res.status(200).json({
      status: "success",
      message: "category created",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  const { name } = req.body;
  const category = await Categories.findOne({ where: { id: req.params.id } });
  if (!name) return res.status(400).json({ message: "Please Fill the Fields" });
  if (!category) return res.status(400).json({ message: "category not found" });
  try {
    await Categories.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({
      status: "success",
      message: "category updated",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const data = await Categories.destroy({ where: { id: req.params.id } });
    if (!data) return res.status(400).json({ message: "Category not found" });
    res.status(200).json({
      status: "success",
      message: "Category Deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
