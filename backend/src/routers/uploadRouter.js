const express = require("express");
const { uploadController } = require("../controllers");
const router = express.Router();

router.post("/upload", uploadController.uploadFile);
// route.get('/get', uploadController.getAlbum)
module.exports = router;
