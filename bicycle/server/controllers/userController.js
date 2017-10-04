const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcrypt');

mongoose.Promise = global.Promise;

module.exports= {
    all: function(req, res){
        User.find({},function(err, users){
            if(err){
                console.log(err);
                res.status(400).json(err);
            } else {
                res.json(users)
            }
        })
    }, 

    register: function(req, res){
        User.find({email: req.body.email}, function (err, user){
            if(user.length> 0){
                let err= {error: "Already in the database"}
                return res.status(401).json(err)
            } else {
                let user = new User(req.body)
                user.save((err) =>{
                    if(err){
                        return res.status(401).json(err);
                    } else {
                        return res.json(user)
                    }
                })
            }
        })
    }, 

    login: function(req, res){
        User.findOne({email: req.body.email}, function (err, user){
            if (!user){
                return res.status(401).json({error: "User not existed"})
            } else if (!bcrypt.compareSync(req.body.password, user.password)){
                return res.status(401).json({error: "Password doesn't match"})
            } else {
                req.session.name = user.firstName;
                req.session.email = user.email;
                req.session.user_id = user._id;
                console.log(req.session.name)
                console.log(req.session)
                
                return res.json(user)
            }
            })
        
    },

    current: function(req, res){
       if(req.session.name == undefined){
           console.log("not in sesion")
           return res.json({error: "not in session"})
       } else {
           console.log(req.session.user_id)
           return res.json({userId: req.session.user_id})
       }
    }


}