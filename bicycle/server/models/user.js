var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        min: [2, 'Name Must be More than 2 characters'],
        required: [true, "First name is required"],
        trim: true
    },
    lastName: {
        type: String,
        min: [2, 'Name Must be More than 2 characters'],
        required: [true, "Last name is required"],
        trim: true
    },
    email: {
        type: String,
        minlength: 2,
        required: [true, "Email is required"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 32,
        required: [true, "Password is required"],
      },

    passwordConfirmation: {
        type: String,
        minlength: 6,
        required: true,
        validate: {
            validator: function(value){
                return value == this.password;
            }, message: "Password do not match"
        }
    },
   bikes: [{type: Schema.Types.ObjectId, ref: 'User'}]
  },
    {timestamps: true}
);

UserSchema.pre('save', function(next){
    const self= this;
    bcrypt.hash(this.password, 10, function(err, hashedPassword){
        if(err){
            console.log(err);
            return
        }
        console.log(hashedPassword);
        self.password = hashedPassword;
        next();
    })
})

mongoose.model('User', UserSchema);
