import {Schema,model} from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
      },
      password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long']
      },
      confirmPassword: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long']
      },
      birthday: {
        type: Date,
        required: true
      },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  export const User = model("users", UserSchema);