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
// Pre Update One Method

// QuestionSchema.pre("findOneAndUpdate",async function(){
//     // if (this._update.title) {
//     //     this._update.slug = makeSlug(this._update.title);
//     // }
// });

// Pre Save Method
QuestionSchema.pre("save",function(next){
    if (!this.isModified("title")) next();
    
    this.slug = makeSlug(this.title);
    next();

});


const makeSlug = (content) => {
    return slugify(content,{
        replacement: '-',   
        remove: /[*+~.()'"!:@]/g,
        lower: true,
    });
}
module.exports  = mongoose.model("Question",QuestionSchema);


