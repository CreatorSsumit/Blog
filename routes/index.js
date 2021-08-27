var express = require('express');
var router = express.Router();
var cc = require("./users");
var passport = require('passport');
var localStrategy = require("passport-local");
var post = require("./post");
var multer = require("multer")



passport.use(new localStrategy(cc.authenticate()));


var storage = multer.diskStorage({
    destination: function(req, file, cb) {

        cb(null, './public/images/uploads')
    },
    filename: function(req, file, cb) {


        var d = new Date();
        d = d.getTime();
        var f = Math.ceil(Math.random() * 100000)
        var fs = Math.floor(Math.random() * 100000)

        var name = d + "_" + f + "_" + fs + file.originalname;
        cb(null, name)

  },

})

var filefilter = function fileFilter(req, file, cb) {

    if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true)
  } else {
        cb(null, false)
        cb(new Error('select correct file'))
   }

}

var upload = multer({ storage: storage, fileFilter: filefilter })




router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
        res.render("index", { isLoggedIn: true, name: req.session.passport.user })
    }
    res.render("index", { name: "" })

})

router.get('/home', isLoggedIn, function(req, res) {

    if (req.isAuthenticated) {
        cc.findOne({ username: req.session.passport.user }).then(function(err) {
          console.log(err)
            res.render('index', { name: err })

        })
    }
});



router.post("/uploadpic" ,isLoggedIn,upload.single("file"),function(req,res){
    cc.findOne({ username: req.session.passport.user }).then(function(err) {
        err.profilepic = './images/uploads/' + req.file.filename;
        err.save().then(function(e){
            res.redirect("/profile");
            console.log(e)
        })

      })


})


router.post("/datafile" ,function(req,res){
    cc.findOne({username:req.body.username}).then(function(f){
        res.json(f)
    })
})

router.get('/signupbutton', function(req, res) {
    res.render('signup', { wrong: "" });
});


router.get('/goback', function(req, res) {
    res.redirect('/');
});



router.post("/signup", function(req, res, next) {

    var user = new cc({
        name: req.body.name,
        username: req.body.username,
        zip: req.body.zip,
        city: req.body.city,


    })

    if (req.body.password === req.body.cpassword) {
        cc.register(user, req.body.password)
            .then(function(err) {

                passport.authenticate('local')(req, res, function() {
                    res.redirect("/profile")
                })


            }).catch(function(e) {
                res.render("already");
            })

    } else {
        res.render("signup", { wrong: "Password not matched !" });
    }


});


router.get("/profile", isLoggedIn, function(req, res) {
    if (req.isAuthenticated) {
        cc.findOne({ username: req.session.passport.user }).then(function(err) {
            res.render('profile', { name: err })

        })
    }


})



router.post("/login", passport.authenticate('local', { successRedirect: '/profile', failureRedirect: '/' }), function(req, res, next) {

})


router.get("/logout", function(req, res, next) {
    req.logOut();
    res.redirect("/")

})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/")
    }

}

router.get("/update/:date", function(req, res, next) {
    cc.findOne({ _id: req.params.date }).then(function(err) {
        res.render("update", { name: err, })

    })

})

router.post("/update/:updates", function(req, res) {
    cc.updateOne({ _id: req.params.updates }, req.body, { new: true }).then(function(err) {
        res.redirect("/profile")



    })

})


router.get("/posts", isLoggedIn, function(req, res) {
    if (req.isAuthenticated()) {
       post.find().then(function(a) {
        cc.findOne({ username: req.session.passport.user }).then(function(err) {
            console.log(err)
            res.render("posts", { name: req.session.passport.user, savepost: a , profilepic: err})

        })


           
        })
    }
})

router.post("/postdata", isLoggedIn, function(req, res) {
    post.create({
        username: req.session.passport.user,
        post: req.body.post,

    }).then(function(userfound) {

        res.redirect("/posts")
    })

})


router.get("/like/:like", isLoggedIn, function(req, res) {

    post.findOne({ _id: req.params.like }).then(function(found) {
        if (found.like.indexOf(req.session.passport.user) === -1) {
            found.like.push(req.session.passport.user);
        } else {
            let hatanewaala = found.like.indexOf(req.session.passport.user);
            let copy = found.like;
            copy.splice(hatanewaala, 1);
            found.like = copy;
        }
        found.save().then(function(e) {
            res.redirect("/posts")
        })

    }).catch(function(rr) {
        res.send(rr)
    })


})






module.exports = router;






// {userfound.posts.push(req.body.post);
//userfound.save().then(function(savepost))
//res.send(savepost);
//users.js =
// post: string,
//like: {
//   type:numbar,
//   default:0
//},
//dislike:number,
// date: {
//  type: Date,
// default : new  Date()}
//

//wolike.likes= wopost.likes +1;
//wopost.save().then(fu(like){

//}).catch(fn())

// refreash 

// localstorage setitem()  learn value of any thing like scroll position

//window.clientY
//= window.scrollY

//



// update:
//     cc.findone() -render new page for edit 
//    form page create new account for update --> 
//    router /update post mothod -->

// math.ceil(math.random()*100000)

//multer  


//  new app  

// form action=""  enctype= "multipart/form-daata"

//  input type = " file"
// npm i multer --save
//

//indexjs
// require muter
// diskstorage cpoy and paste on indexjs
//make upload var
// route pe upload add  upload.single("file")
//filename ;
// var d = new date();
//d = g.gettime();
// var nme = d+file.originalname;
//cb(null, nme) 
//`<img src = "${path}"/>`









// upload.none()