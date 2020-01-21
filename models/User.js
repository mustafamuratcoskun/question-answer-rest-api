const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    name : {
        type : String,
        required:[true,"Please provide a name"]
    },
    email : {
        type : String,
        required: true,
        unique : true,
        match : [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ]
    },
    role : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    },
    password : {
        type : String,
        minlength : 6,
        required : [true,"Please provide a password"],
        select : false
    },
    createdAt : {
        type : Date,
        default : Date.now

    }

});

UserSchema.pre("save",function (next) {
    
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        });
    });

});
module.exports  = mongoose.model("User",UserSchema);


