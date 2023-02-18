// Cloudinary config goes under here
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();

// Cloudinary config goes under here
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  // secure: true
});

exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.url,
          id: result.public_id,
        });
      },
      {
        rersource_type: "auto",
        folder: folder,
      }
    );
  });
};
