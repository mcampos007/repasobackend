import products from "../models/product.js";

export const getAllProducts = (req, res) => {
  res.json(products);
};
