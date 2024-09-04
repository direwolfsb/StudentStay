import express from "express"
import {deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyToken, verifyUser,verifyAdmin } from "../utils/verifyToken.js";
const router= express.Router();


router.get("/checkauthentication",verifyToken,(req,res,next)=>{
    res.send("You are authenticated")
})

router.get("/checkUser/:id",verifyUser,(req,res,next)=>{
    res.send("You are logged in and can delete your account")
})

router.get("/checkAdmin/:id",verifyAdmin,(req,res,next)=>{
    res.send(" Hello admin! You are logged in and can delete all account")
})
//update
router.put("/:id",verifyUser,updateUser)

//delete
router.delete("/:id",verifyUser,deleteUser)

//get
router.get("/:id",verifyUser,getUser)

//get all
router.get("/",verifyAdmin,getUsers)






export default router