import express from "express";
import UserController from "../controllers/user/user.controller.js";

const router = express.Router();
const userController = new UserController();

router.get('/',function(req,res,next){
    res.send("Welcome to distance api...")
})
router.get('/users',userController.getUsers)
router.post("/adduser",userController.addUser);
router.get("/getuserbyid",userController.getUserById)
router.put('/updateuserbyid',userController.updateUserById)
router.delete('/deleteuserbyid',userController.deleteUserById)
router.put("/updatedistance",userController.updateDistanceByUserId);
router.get("/getdistancebyuserid",userController.getDistanceByUserId);

export default router;
