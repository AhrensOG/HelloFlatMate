import { ref, deleteObject } from "firebase/storage";
import { storage } from "./config";

const deleteFiles = async (files, folder = "Products") => {
  try {
    for (const file of files) {
      const storageRef = ref(storage, `${folder}/${file.name}`);
      await deleteObject(storageRef);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const extractFilePathFromUrl = (url) => {
  const pathStart = url.indexOf("/o/") + 3;
  const pathEnd = url.indexOf("?");
  const filePath = url.substring(pathStart, pathEnd);
  return decodeURIComponent(filePath);
};

const deleteFilesFromURL = async (files) => {
  try {
    for (const file of files) {
      const filePath = extractFilePathFromUrl(file);
      const storageRef = ref(storage, filePath);
      await deleteObject(storageRef);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export { deleteFiles, deleteFilesFromURL };
