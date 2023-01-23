var express = require('express');
var categorySchema = require('../../models/category.model')
const {sendSuccessResponse, sendErrorResponse} = require("../../utils");
var router = express.Router();
const { Storage } = require("@google-cloud/storage");
const UUID = require("uuid-v4");
const formidable = require("formidable-serverless");


const storage = new Storage({
    keyFilename: "admin.json",
});


// /admin/category
router.route('/')
    .post( (req, res, next) =>{
        const form = new formidable.IncomingForm({ multiples: true });
        let uuid = UUID();
        form.parse(req ,(err, fields, files) => {
            console.log("FILES = ", files)
            console.log("FILED =", fields)
            const categoryImage = files.image;
            if (err || categoryImage.size==0) {
                throw new Error("There was an error parsing the files")

            }
            // url of the uploaded image

            // const docID = userRef.doc().id;
            const bucket = storage.bucket(process.env.BUCKET_STORAGE);
            const timestamp = Date.now();
            const name = categoryImage.name.split(".")[0];
            const type = categoryImage.name.split(".")[1];
            const fileName = `${name}_${timestamp}.${type}`;
            bucket.upload(categoryImage.path, {
                destination: `categories/images/${fileName}`,
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
                return categorySchema.create({ name : fields.name , imageUrl : imageUrl , createdBy : req.user.id})

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
