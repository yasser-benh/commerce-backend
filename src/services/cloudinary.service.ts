
import cloudinary from "../config/cloudinary";

export const uploadImage = async (filePath: string) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'TechTinker/products_images',
        });
        return result;
      } catch (error) {
        throw new Error('Image upload failed');
      }
}