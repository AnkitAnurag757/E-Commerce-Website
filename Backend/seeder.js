const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/user");
const products = require("./data/products");
const Cart = require("./models/Cart");

dotenv.config();

//connect to mongodb

mongoose.connect(process.env.MONGO_URI);

//function to seed data

const seedData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // create  a default admin user

    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    //Assign the default user ID to each Product
    const userID = createdUser._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    //Insert the products into the database

    await Product.insertMany(sampleProducts);

    console.log("Product data seeder successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
};

seedData();
