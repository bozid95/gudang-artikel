import Users from "../models/userModel.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const data = await Users.findAll();
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const data = await Users.findOne({ where: { id: req.params.id } });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const email_exist = await Users.findOne({ where: { email: email } });
  const hashPassword = bcrypt.hashSync(password, 10);
  if (email_exist)
    return res.status(400).json({
      message: "Email already exist",
    });
  if (password !== confirmPassword)
    return res.status(400).json({
      message: "Password doesnt match",
    });
  if ({ name, email, password, confirmPassword } == null)
    return res.status(400).json({
      message: "Please Fill the Fields",
    });
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.status(200).json({
      status: "success",
      message: "User Created",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateUser = async (req, res) => {
  const user = await Users.findOne({ where: { id: req.params.id } });
  if (!user)
    return res.status(200).json({
      message: "User Not Found",
    });
  const { name, email, password, confirmPassword } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword === user.password;
  } else {
    hashPassword = bcrypt.hashSync(password, 10);
  }
  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ message: "Password and confirm password doesnt match" });
  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    return res.status(200).json({
      status: "Success",
      message: "User Updated",
    });
  } catch (error) {}
};
export const deleteUser = async (req, res) => {
  try {
    const data = await Users.destroy({ where: { id: req.params.id } });
    if (!data) return res.status(400).json({ message: "User not found" });
    res.status(200).json({
      status: "success",
      message: "User Deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


