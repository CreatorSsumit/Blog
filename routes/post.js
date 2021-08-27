const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/post1");




var b = new mongoose.Schema({

    username: String,


    post: String,

    date: {
        type: Date,
        default: new Date()
    },
    like: []

})


module.exports = mongoose.model("post", b);


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