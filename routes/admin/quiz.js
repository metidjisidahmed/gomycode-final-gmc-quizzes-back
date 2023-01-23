var express = require('express');
const quizSchema=require("../../models/quiz.model")
const {sendSuccessResponse, sendErrorResponse} = require("../../utils");



var router = express.Router();
const { Storage } = require("@google-cloud/storage");
const UUID = require("uuid-v4");
const formidable = require("formidable-serverless");

const CHOICES =  [{
    name : "Seal",
    isCorrect : false
},{
    name : "Penguin",
    isCorrect: false
}, {
    name : "Pig",
    isCorrect : false
} , {
    name : "Lion",
    isCorrect : true
}]

const storage = new Storage({
    keyFilename: "admin.json",
});

// /admin/quiz
router.route('/')
    .post( (req, res, next) =>{
        // console.log("FORM =", req)


        const form = new formidable.IncomingForm({ multiples: true });
        let uuid = UUID();

        form.parse(req ,(err, fields, files) => {
            console.log("FILES = ", files)
            console.log("FILED =", fields)
            const quizImage = files.image;
            let choices = CHOICES
            console.log("CHOICES =", choices)
            // for(let i =0; i < choices.length ; i++){
            //     if(choices[i].isCorrect=="true"){
            //         choices[i].isCorrect = true
            //     }else {
            //         choices[i].isCorrect = false
            //     }
            // }
            console.log("choices =", choices)
            // choices = choices.map(choice=>{
            //     choice.isCorrect = choice.isCorrect=="true" ? true : false
            // })
            if (err || quizImage.size==0) {
                throw new Error("There was an error parsing the files")

            }
            // url of the uploaded image

            // const docID = userRef.doc().id;
            const bucket = storage.bucket(process.env.BUCKET_STORAGE);
            const timestamp = Date.now();
            const name = quizImage.name.split(".")[0];
            const type = quizImage.name.split(".")[1];
            const fileName = `${name}_${timestamp}.${type}`;
            bucket.upload(quizImage.path, {
                destination: `quizzes/images/${fileName}`,
                resumable: true,
                metadata: {
                    metadata: {
                        firebaseStorageDownloadTokens: uuid,
                    },
                },
            })
                .then(imageResponse=>{
                    let imageUrl;
                    var downLoadPath =
                        `https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_PROJECT_NAME}.appspot.com/o/`;
                    imageUrl =
                        downLoadPath +
                        encodeURIComponent(imageResponse[0].name) +
                        "?alt=media&token=" +
                        uuid;
                    return quizSchema.create({ ...fields , imageUrl : imageUrl , createdBy : req.user.id , choices : CHOICES})

                })
                .then(createdCategory=>{
                    sendSuccessResponse(res , 200, createdCategory)
                })
                .catch(err=>{
                    sendErrorResponse(res , 500 , err)
                })
        })


    } )


module.exports = router;
