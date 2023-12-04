import mongoose from "mongoose";
// Create a Mongoose Schema
const userSchema = new mongoose.Schema({
  userId: {
    type: Number
  },
  userName:{
    type:String
  },
  email:{
    type:String
  },
  phone:{
    type:String
  },
  city:{
    type:String
  },
  maxDistance: {
    type: Number
  },
  minDistance: {
    type: Number
  },
});

const User = mongoose.model('User', userSchema);

  
export default User;