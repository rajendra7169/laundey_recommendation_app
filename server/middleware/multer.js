import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
// In the above code, we have created a middleware that uses multer to store uploaded files in the server. We have also exported the middleware so that we can use it in other files. This middleware will be used in the productController.js file to upload images of products to the server.
