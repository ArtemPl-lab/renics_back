const uploadsDir = "/var/www/files/";

var multer  = require('multer');
const fs = require('fs');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const date = new Date();
        fs.mkdirSync(`${uploadsDir}${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`, { recursive: true });
        cb(null, `${uploadsDir}${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`);
    },
    filename: function (req, file, cb) {
        const uniqPrefix = `${Date.now()}-${Math.round(Math.random() * 1E9)}-`;
        cb(null, uniqPrefix + file.originalname)
    }
})
var upload = multer({ storage: storage }).single('file');

module.exports = function(app) {
    app.post('/files', function(req, res){
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                res.status(500);
                res.send({
                    message: err
                });
            } else if (err) {
                res.status(500);
                res.send({
                    message: err
                });
            }
            res.send({
                file: req.file.path.replace(/\\/g,"/").replace(uploadsDir, `${app.get('url')}/files/`)
            });
        });
    });
  }
