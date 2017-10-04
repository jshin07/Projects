const mongoose = require('mongoose');
const Bicycle = mongoose.model("Bicycle");
const User = mongoose.model("User");

mongoose.Promise = global.Promise;

module.exports= {
    create: function(req, res){
        let bike = new Bicycle(req.body)
        console.log(req.body)
        console.log(req.session)
        bike.user_id = req.session.user_id
        bike.save((err)=> {
            if(err){
                return res.status(401).json(err);
            } else {
                return res.json(bike)                
            }
        })
    },

    all: function(req, res){
        Bicycle.find({},function(err, bicycles){
            if(err){
                console.log(err);
                res.status(401).json();
            } else {
                res.json(bicycles)
            }
        })
    }, 

    destroy: function (req, res){
        console.log(req.params.id +"from the controller")
        let bike = new Bicycle(req.body);
        Bicycle.findByIdAndRemove(req.params.id, function(err, bike){
            if (err){
                return res.status(401).json(err);
            } else {
                // console.log(req.params.id)
                return res.json({message: 'successful delete'})
            }
        })
    },

    update: function (req, res){
        req.body.user_id = req.session.user_id;
        Bicycle.findByIdAndUpdate(req.params.id, req.body, function(err, result){
            if (err){
                console.log(err)
                return res.status(401).json(err); 
            } else {   
                console.log(req.body)
                console.log(req.body.user_id, "this is req.body.user_id")
                return res.json({message: 'updated'})  
            }
        })
    },

    getbike: function (req, res){
        Bicycle.find({_id: req.params.id}, function( err, bike){
            if(err){
                console.log(err);
                res.status(401).json();
            } else {
                res.json(bike)
            }
        })
    }


}