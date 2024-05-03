const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/insta_clone");
var userSchema=new mongoose.Schema({
  username:{type:String,require:true},
  fullname:String,
  email:String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  dp: { type: String },
  password:{type:String,require:true ||'password is required'},
});
userSchema.plugin(plm);
module.exports=mongoose.model("User",userSchema);
