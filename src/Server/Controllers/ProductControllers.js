const Product = require("../Models/ProducrModel");

const Addproduct = async (req, res) => {
  try {
    const username = req.user.name;
    const { name, description, price, company, category } = req.body;
    if (!name || !description || !price || !company || !category) {
      return res.status(404).json("Fill all required fields");
    }

    const newProduct = await new Product({
      name,
      description,
      price,
      company,
      category,
      user: username,
    });
    await newProduct.save();
    return res.status(200).json("Product Added");
  } catch (error) {
    console.log(error);
    return res.status(400).json("Something went wrong");
  }
};

const Allproducts = async (req, res) => {
  try {
    const allproducts = await Product.find();
    if (allproducts.length < 1) {
      return res.status(204).json("No Products found");
    }
    return res.status(200).json(allproducts);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const SingleProduct = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    if (!product) {
      return res.status(404).json("No product Found");
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};
const DeleteProduct = async (req, res) => {
  try {
    console.log(req.params.id);
    const product = await Product.findByIdAndDelete({ _id: req.params.id });
    if (!product) {
      return res.status(400).json("No product found");
    } else {
      return res.status(200).json("Product Deleted");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};
const UpdateProduct = async (req, res) => {
  try {
    const { name, description, price, category, company } = req.body;
    const product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      { name, description, price, category, company }
    );
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const SearchProduct = async (req, res) => {
  let products = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { description: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { user: { $regex: req.params.key } },
    ],
  });
  res.status(200).json(products);
};

module.exports = {
  Addproduct,
  Allproducts,
  SingleProduct,
  UpdateProduct,
  DeleteProduct,
  SearchProduct,
};
