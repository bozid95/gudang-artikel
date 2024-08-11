import Posts from "../models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    const data = await Posts.findAll();
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
