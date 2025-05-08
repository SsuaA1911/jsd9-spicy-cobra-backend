import express from "express";
import { User } from "../../../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password, confirmPassword, birthday } = req.body;
if(!email || !password || !confirmPassword || !birthday) {
    return res.status(400).json({ message: "All fields are required" 

    });
  }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" 

        });
    }
    try{
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use."
                
             });
        }
        const newUser = new User({ email, password, confirmPassword, birthday });
        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" 

        });
      
    }  catch(err){
        console.error(err);
        return res.status(500).json({ message: "Internal server error" 

        });
    }
});