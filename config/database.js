
const mongoose = require('mongoose');

// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from the environment variable
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false, // This option ensures that Mongoose doesn't use the deprecated findAndModify() method
      useCreateIndex: true,    // To avoid deprecation warnings related to creating indexes
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // If there's an error connecting to the database, log the error and exit the process
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

// Export the connection function to use it in other files
module.exports = connectDB