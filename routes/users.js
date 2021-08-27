const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/dhh");
var plm = require("passport-local-mongoose");



var b = mongoose.Schema({
    name: String,
    username: String,
    city: String,
    zip: Number,
    profilepic: {
        type:String,
        default:'../images/image.jpg'
    }
   

})

b.plugin(plm)

module.exports = mongoose.model("again", b);




// update:
//     cc.findone() -render new page for edit 
//    form page create new account for update --> 
//    router /update post mothod -->  
//    findoneandupdate({value change},{new:true})->

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