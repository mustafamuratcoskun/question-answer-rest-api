const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Question = require("./Question");
const Answer = require("./Answer");

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

    },
    title : {
        type: String
    },
    about : {
        type:String
    },
    website : {
        type: String 
    },
    place : {
        type: String
    },
    profile_image : {
        type : String,
        default : "default.jpg"
    },
    blocked : {
        type : Boolean,
        default : false
    },
    resetPasswordToken : {
        type:String
    },
    resetPasswordExpire: {
        type : Date
    }

});
UserSchema.methods.getTokenFromUserModel = function() {
    const {JWT_SECRET_KEY,JWT_EXPIRE} = process.env;
    
    const payload = {
        id : this._id,
        name : this.name
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY, {expiresIn : JWT_EXPIRE});

    return token;
};
UserSchema.methods.getResetPasswordToken = function() {
    
    
    const randomHexString = crypto.randomBytes(15).toString("hex");

    const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex");

    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRE)

    
    return resetPasswordToken;

};
UserSchema.pre("save",function (next) {
    

    if (!this.isModified("password")){
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        });
    });
});
UserSchema.post("remove",async function(next){
    const result = await Question.deleteMany({
        user : this._id
    });
});
module.exports  = mongoose.model("User",UserSchema);


