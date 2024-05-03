var express = require('express');
var router = express.Router();
var userModel=require('./users');
const postModel = require("./post");
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));
const upload = require("./multer")
const profilepic =require("./multer_profile");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post("/upload", isLoggedIn, upload.single("file"), async function (req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded!");
    } 
    // Retrieve the current user using req.user._id
    const user = await userModel.findById(req.user._id);

    // Create a new post
    const postData = await postModel.create({
      image: req.file.filename,
      imageText: req.body.imageText,
      user: user._id,
      dp:" "
    });

    // Push the post ID into the user's postArray
    user.posts.push(postData._id);  
    await user.save(); 
    res.redirect("/feed");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
});





router.get('/login', function(req, res, next) {
  const error = req.flash("error"); 
  console.log(error)
  res.render('login');
});



router.get("/feed", isLoggedIn, async(req, res) => {

  const user = await userModel.findById(req.user._id).populate("posts"); 
  const alluser=await userModel.find().populate("posts");
  const posts=await postModel.find().populate("user");
  res.render("feed",{user,alluser,posts});
})



router.get("/profile", isLoggedIn, async (req, res) => { 
  const user = await userModel.findById(req.user._id).populate("posts"); 
  res.render("profile", {user})
}) 
router.post("/profileEdit", isLoggedIn,profilepic.single("file"), async (req, res) => { 
  try {
    if(!req.file){
      return res.status(400).send('no file selected');
    }
    const user = await userModel.findByIdAndUpdate(req.user._id,{dp:req.file.filename}); 
    console.log(user);
    res.redirect("/profile");
  } catch (error) {
    console.log('kuch to huah ');
    console.log(error);
  }
}) 





router.post("/register", (req, res) => {
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname,dp:"default.jpg" });

  userModel.register(userData, req.body.password)
    .then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    })
    .catch((error) => {
      console.error(error);
      res.render("error", {error});
    });
});



router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/feed",
    failureRedirect: "/login",
    failureFlash: true,
  })
);



router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});




function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  else res.redirect("/login");
}




module.exports = router;
