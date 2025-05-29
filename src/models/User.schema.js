import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  // confirmPassword is NOT usually saved in DB, just validated before creating user
});

// You can add pre-save hooks here for hashing password, etc.

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;