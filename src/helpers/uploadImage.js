import axios from "axios";

const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`;

// const uploadImage = async (image) => {
//   const formData = new FormData();
//   formData.append("file", image);
//   formData.append("upload_preset", `${import.meta.env.VITE_UPLOAD_PRESET}`);
//   try {
//     const dataResponse = await axios.post(url, { formData });
//     return dataResponse.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

const uploadImage  = async(image) => {
  const formData = new FormData()
  formData.append("file",image)
  formData.append("upload_preset",`${import.meta.env.VITE_UPLOAD_PRESET}`)
  

  const dataResponse = await fetch(url,{
      method : "post",
      body : formData
  })

  return dataResponse.json()

}


export { uploadImage };
