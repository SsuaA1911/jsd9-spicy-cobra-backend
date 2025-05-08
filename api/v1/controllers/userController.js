import{ User } from "../../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const { email, password, confirmPassword, birthday } = req.body;
    if(!email || !password || !confirmPassword || !birthday) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    try{
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use." });
        }
        const newUser = new User({ email, password, confirmPassword, birthday });
        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "Internal server error" 

        });
    }

    
}
export const profileUser = async(req,res)=>{
    try {
    
    const user = await User.findById(req.user.user._id).select("-password"); // exclude password
     if(!user){
      return res.status(404).json({error: true, message: "User not found" })
    }
    res.status(200).json({error: false,user});
  }catch(err){
    console.log(err)
    res.status(500).json({err:true,message: "/profile/err"})
  }
  }