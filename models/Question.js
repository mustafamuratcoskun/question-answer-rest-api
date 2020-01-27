const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");


const QuestionSchema = new Schema({
    title : {
        type : String,
        required:[true,"Please provide a title"],
        minlength : [10,"Please provide title at least 10 characters"],
        unique : true
    },
    content : {
        type : String,
        required : [true,"Please provide a content"],
        minlength : [20,"Please provide content at least 20 characters"]
    },
    slug : String,
    vote : {
        type : Number,
        default : 0
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    }

});
QuestionSchema.pre("save",function(next){
    
    this.slug = slugify(this.title, {
        replacement: '-',   
        remove: /[*+~.()'"!:@]/g,
        lower: true,
    });
    next();

});

module.exports  = mongoose.model("Question",QuestionSchema);

