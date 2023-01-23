let mongoose=require('mongoose')
let Schema =mongoose.Schema
require('mongoose-type-url')

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


var userSchema = new Schema({
    mail : {
        type: Schema.Types.String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password : {
        type : Schema.Types.String
    },
    userName: {
        type : Schema.Types.String,
        required: "UserName is required",
        unique: true
    },
    avatarUrl :{
        type : mongoose.SchemaTypes.Url,
        default : "https://console.firebase.google.com/u/0/"
    }
}, {
    timestamps: true
})

module.exports= mongoose.model("User"  , userSchema )
