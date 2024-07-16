import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

const uploadFiles = async (files, folder = 'Documentos') => {
  try {
    const uploadedFiles = [];

    for (const file of files) {
      const storageRef = ref(storage, `${folder}/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      uploadedFiles.push({
        name: file.name,
        url,
      });
    }

    return uploadedFiles;
  } catch (error) {
    return console.log(error);
  }
};

export { uploadFiles };
