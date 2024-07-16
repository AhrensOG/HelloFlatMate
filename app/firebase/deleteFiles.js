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

export { deleteFiles };
