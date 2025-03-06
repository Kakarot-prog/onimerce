import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "diig5idef",
  api_key: "535532863895195",
  api_secret: "pKra4Jyj2OoDTvfK9_xYVxAB6pQ",
});

const cloudinarySetup = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    return result.secure_url;
  } catch (error) {
    console.log(error);
    console.log("Failed to upload image to cloudinary");
  }
};

export const deleteImage = async (filePath) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(filePath);
    console.log(result);
  } catch (error) {
    console.log(error);
    console.log("Failed to delete image from cloudinary");
  }
};
export default cloudinarySetup;
