import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./config";

const uploadFiles = async (files, folder = "Documentos", name = false) => {
  try {
    const uploadedFiles = [];

    for (const file of files) {
      const storageRef = ref(storage, `${folder}/${name ? name : file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      uploadedFiles.push({
        name: name || file.name,
        url,
      });
    }

    return uploadedFiles;
  } catch (error) {
    return new Error(error);
  }
};

const uploadContractPDF = async (file, name, folder = "Contratos") => {
  try {
    const storageRef = ref(storage, `${folder}/${name}`);
    await uploadBytes(storageRef, file, { contentType: "application/pdf" });
    const url = await getDownloadURL(storageRef);

    return {
      name,
      url,
    };
  } catch (error) {
    return console.log(error);
  }
};

export { uploadFiles, uploadContractPDF };
