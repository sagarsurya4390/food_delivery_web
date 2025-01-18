const mongoose = require('mongoose');

// MongoDB connection string
const mongoURL = "mongodb+srv://sagar_surya:4577@cluster0.v5zz0.mongodb.net/befoodymern?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB");

    // Fetch food_items collection data
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");

    // Fetch data concurrently using Promise.all
    const [foodItems, foodCategories] = await Promise.all([
      foodItemsCollection.find({}).toArray(),
      foodCategoryCollection.find({}).toArray()
    ]);

    // Store data globally
    global.food_items = foodItems;
    global.foodCategory = foodCategories;

  } catch (err) {
    console.error("MongoDB connection error: ", err);
  }
};

module.exports = mongoDB;
