const { check, validationResult } = require("express-validator");
const User = require("../models/usermodel");

const bcrypt = require('bcrypt')


exports.getlogin = (req, res, next) => {
   res.render("auth/login", {
      isLoggedIn: req.isLoggedIn,
      errors: [],
      oldInput: { email: "" },
   });


   // ^^^remember to add the same key value pair for both get and post.if used in post method then same empy key value pair should be in get as well

};


exports.postsignup = [


   check('firstName')
      .trim()
      .isLength({ min: 2 })
      .withMessage("first name should be at least of 2 character")
      .matches(/^[A-Za-z\s]+$/)
      .withMessage("first name should contain only alphabets"),

   check('lastName')
      .matches(/^[A-Za-z\s]*$/)
      .withMessage("first name should contain only alphabets"),

   check('email')
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),

   check('password')
      .isLength({ min: 8 })
      .withMessage("Password should be at least 8 character long")
      .matches(/[A-Z]/)
      .withMessage("password should contain at least one uppercase")
      .matches(/[a-z]/)
      .withMessage("password should contain at least one lowercase")
      .matches(/[0-9]/)
      .withMessage("password should contain at least one number")
      .matches(/[!@&]/)
      .withMessage("password should contain at least one special character")
      .trim(),

   check('confirmPassword')
      .custom((value, { req }) => {
         if (value !== req.body.password) {
            throw new Error("Passwords do not match");
         }
         return true;
      }),

   check('userType')
      .notEmpty()
      .withMessage("please select user type")
      .isIn(['guest', 'host'])
      .withMessage("invalid user type"),

   check("policies")
      .notEmpty()
      .withMessage("please accept the terms an conditions")
      .custom((value, { req }) => {
         if (value !== "on") {
            throw new Error("pleaase accect the terms and conditions")
         }
         return true;
      }),
   (req, res, next) => {

      const { firstName, lastName, email, password, userType } = req.body
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(422).render('auth/signup', {
            isLoggedIn: false,
            errors: errors.array().map(err => err.msg),
            oldInput: { firstName, lastName, email, password, userType }
         })
      }


      bcrypt.hash(password, 12)
         .then(hashedPassword => {
            const newUser = new User({ firstName, lastName, email, password: hashedPassword, userType })
            return newUser.save()
            //   used return because next then is outside its scope

         })
         .then(() => {
            res.redirect('/login')
         })
         .catch(err => {
            return res.status(422).render('auth/signup', {
               isLoggedIn: false,
               errors: [err.message],
               oldInput: { firstName, lastName, email, password, userType }
            })
         })


   }];

exports.loggedin = async (req, res, next) => {
   console.log(req.body)

   const { email, password } = req.body
   

   const user = await User.findOne({ email })
   if (!user) {
      return res.status(422).render('auth/login', {
         isLoggedIn: false,
         errors: ["email not found"],
         oldInput: { email }
      })
   }

   const isMatch =await bcrypt.compare(password,user.password)
   if(!isMatch){
      return res.status(422).render('auth/login',{
         isLoggedIn: false,
         errors: ["entered password is incorrect"],
         oldInput: { email }
         
      })
   }

     req.session.isLoggedIn = true;  

     res.redirect("/")
}


exports.loggedout = (req, res, next) => {
   req.session.destroy(() => {
      res.redirect("/")

   })

}

exports.getsignup = (req, res, next) => {
   res.render("auth/signup", {
      isLoggedIn: req.isLoggedIn,
      errors: [],
      oldInput: { firstName: "", lastName: "", email: "", password: "", userType: "" }
   });


};



