// Replace 'your_mongodb_uri' with your MongoDB connection string
import mongoose from "mongoose";

// Approach:1
// const db = mongoose.connect('mongodb://localhost:27017/distancedb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('Connected to distanddb'))
//   .catch(err => console.error('Error connecting to MongoDB:', err));


//  Approach:2
// another approch of db.on and db.once
mongoose.connect('mongodb://localhost:27017/distancedb', {
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB distancedb Database');
});


export default db;