let config = require("./config");

module.exports = function (uploadFile, multer, multerS3, aws, path) {
    console.log(config.key.accessKeyId, config.key.secretAccessKey)
    const s3 = new aws.S3({
        accessKeyId: config.key.accessKeyId,
        secretAccessKey: config.key.secretAccessKey,
        Bucket: config.key.Bucket,
        region: "ap-south-1"
    });

    const uploadsBusinessGallery = multer({
        storage: multerS3({
            s3: s3,
            bucket: config.key.Bucket,
            acl: "public-read",
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: function (req, file, cb) {
                cb(
                    null,
                    path.basename(
                        file.originalname,
                        path.extname(file.originalname)
                    ) +
                    "-" +
                    Date.now() +
                    path.extname(file.originalname)
                );
            }
        }),
        fileFilter: function (req, file, cb) {
            checkFileType(file, cb);
        }
    }).array("files", 3);

    function checkFileType(file, cb) {
        // Allowed ext
        const filetypes = /jpeg|png|svg|jpg|pdf/;
        // Check ext
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        // Check mime
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("Error: Images And PDFs Only!");
        }
    }

    uploadFile.post('/uploadFile', (req, res, next) => {

        uploadsBusinessGallery(req, res, error => {

        // Check ext

            const {todoId, token } = req.body;
            console.log(token, todoId)
            // console.log(todoId)
            if (error) {

                // console.log("errors", error);
                res.json({ error: error });
            } else {
                console.log("files is here", req.files);
                // If File not found
                if (req.files === undefined) {
                    console.log("Error: No File Selected!");
                    res.json("Error: No File Selected");
                } else {
                    let fileArray = req.files
                    console.log(fileArray)
                }
            }
        });
    });
};