let mongoose=require('mongoose')
let Schema =mongoose.Schema
require('mongoose-type-url')




var answerSchema = new Schema({

    userID: {
        type : Schema.Types.ObjectId,
        ref : "User",
        required :"UserID is required"
    },
    quizID: {
        type : Schema.Types.ObjectId,
        ref : "Quiz",
        required :"QuizID is required"
    },
    isCorrect : {
        type : Schema.Types.Boolean,
        required : true
    }
}, {
    timestamps: true
})

module.exports= mongoose.model("Answer"  , answerSchema)
