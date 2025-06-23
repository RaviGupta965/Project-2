import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email:{
    type:String,
    required:true,
    minlength: 2,
    maxlength: 50,
    trim:true
  },
  Phone: {
    type: String,
  },
  query:{
    type:String,
    minlength:10
  }
  // confirmPassword is NOT usually saved in DB, just validated before creating user
});

// You can add pre-save hooks here for hashing password, etc.

const Query = mongoose.models.Query || mongoose.model('Query', userSchema);

export default Query;