let mongoose=require('mongoose')
let Schema =mongoose.Schema
require('mongoose-type-url')

function quizChoicesLimit(val) {
    return val.length === 4;
}


var quizSchema = new Schema({
    imageUrl : {
        type : mongoose.SchemaTypes.Url,
        required: 'Quiz imageUrl is required'
    },
    choices :{
        type : [{
            name : {
                type : Schema.Types.String,
                required: "Choice Name is required"
            },
            isCorrect: {
                type : Schema.Types.Boolean,
                required : "Choice isCorrect is required"
            }
        }],
        required : true,
        validate: [quizChoicesLimit, 'Quiz Choices must be exactly 4!']
    },
    categoryID : {
        type : Schema.Types.ObjectId,
        ref : "Category",
        required :"CategoryID is required"
    },
    createdBy: {
        type : Schema.Types.ObjectId,
        ref : "Admin",
        required :"Quiz CreatedBy is required"
    }

}, {
    timestamps: true
})

module.exports= mongoose.model("Quiz"  , quizSchema)
