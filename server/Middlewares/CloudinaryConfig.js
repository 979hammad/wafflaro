import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name : process.env.cloudName,
    api_key : process.env.apiKey,
    api_secret : process.env.apiSecret
})

const wafflaroImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wafflaro[images]',
      allowedFormats: ["png", "jpg", "jpeg"]
    }
});

export {wafflaroImageStorage};