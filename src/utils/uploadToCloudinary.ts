import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
export const uploadToCloudinary = async (imagePath:string) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath )
            
    
        return result.secure_url;
    } catch (error) {
        console.log("Cloudinary upload error", error);
        return null;
}}