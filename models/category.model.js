let mongoose=require('mongoose')
let Schema =mongoose.Schema
require('mongoose-type-url')




var categorySchema = new Schema({
    name : {
        type : Schema.Types.String,
        unique : true,
        required: 'Category name is required'
    },
    imageUrl : {
        type : mongoose.SchemaTypes.Url,
        required: 'Category imageUrl is required'
    },
    createdBy: {
            type : Schema.Types.ObjectId,
            ref : "Admin",
            required :"Category CreatedBy is required"
    }

}, {
    timestamps: true
})

module.exports= mongoose.model("Category"  , categorySchema)
