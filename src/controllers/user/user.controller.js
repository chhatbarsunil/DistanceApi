import User from "../../models/user.model.js";
import mongoose from "mongoose";
const db = mongoose.connection;

export default class UserController {
  /**
   * Get all users 
   */
  async getUsers(req, res, next) {
    try {
      const users = await User.find({}).sort({"userId":1});
      if (users.length == 0) {
        res.send("No users found");
      }
      else {
        res.send(users);
      }

    } catch (error) {
      console.error(error);
      res.send(error)
    }
  }
  /**
   * Add user 
   */
  async addUser(req, res, next) {
    try {
      const { userName, email, phone, city } = req.body;
      let maxDistance = req.body.maxDistance;
      let minDistance=req.body.minDistance;
      if(maxDistance == null || maxDistance== undefined){
        maxDistance=0
      }
      if(minDistance == null || minDistance== undefined){
        minDistance=0
      }
      const lastUser = await User.find().limit(1).sort({ userId: -1 });
      const newId = lastUser[0].userId + 1;
      const newUser = await User.create({ userId: newId, userName: userName, email: email, phone: phone, city: city,minDistance:minDistance,maxDistance:maxDistance });
      res.send({ user: newUser }); // Return the user ID
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  /**
   * Update distance field by user id
   */
  async updateDistanceByUserId(req, res, next) {
    try {
      const { userId, minDistance, maxDistance } = req.body;
      const user = await User.find({ userId: userId })
      if (user.length === 0) {
        res.send("Id " + userId + " is not found in database")
      }
      else {
        const updatedUser = await User.updateOne({ userId: userId }, { minDistance: minDistance, maxDistance: maxDistance });
        res.send({ user: updatedUser }); // Return the user ID
      }
    } catch (error) {
      res.json({ error: error.message });
    }
  }
  /**
   * Get User by Id 
   */
  async getUserById(req, res, next) {
    let query = req.query
    try {
      const user = await User.find({ userId: query.userId })
      if (user.length === 0) {
        res.send("Id " + query.userId + " is not found")
      }
      else {
        res.send(user);
      }
    } catch (error) {

      res.send(error.message)
    }
  }
  /**
  * Update User by Id 
  */
  async updateUserById(req, res, next) {
    
    const userModel = req.body
    try {
        const user = await User.findOne({ userId: userModel.userId });
      if (user.userId === null) {
        res.send("Id not found in database");
      }
      else {
            await User.updateOne({ userId: userModel.userId }, { $set:userModel 
        })
        res.send(userModel);
      }
    } catch (error) {
      res.send(error.message)
    }
  }

  /**
  * Delete User by Id 
  */
  async deleteUserById(req, res, next) {
    let query = req.query

    try {
      const id = await User.findOne({ userId: query.userId });
      if (id === null) {
        res.send("Id not found in database");
      }
      else {
        const user = await User.deleteOne({ userId: query.userId })
        res.send(user);
      }
    } catch (error) {
      res.send(error.message)
    }
  }
  /**
   * Get Distance by user id
   */
  async getDistanceByUserId(req,res,next){
    let query = req.query;
    try {
      const id = await User.findOne({ userId: query.userId });
      if (id === null) {
        res.send("Id not found in database from getDistanceByUserId");
      }
      else {
        const user = await User.findOne({ userId: query.userId },{minDistance:1,maxDistance:1,_id:0})
        res.send(user);
      }
    } catch (error) {
      res.send(error.message)
    }
  }
}
