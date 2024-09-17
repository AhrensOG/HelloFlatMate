import { uploadContractPDF, uploadFiles } from "@/app/firebase/uploadFiles";
import axios from "axios";

export const saveUserContractDocuments = (dispatch, values) => {
  try {
    return dispatch({
      type: "SAVE_USER_CONTRACT_DOCUMENTS",
      payload: { id: values.id, files: values.files },
    });
  } catch (error) {
    throw new Error("Internal Server Error: SAVE_USER_CONTRACT_DOCUMENTS");
  }
};

export const saveUserContractInformation = (dispatch, values) => {
  try {
    return dispatch({
      type: "SAVE_USER_CONTRACT_INFORMATION",
      payload: values,
    });
  } catch (error) {
    throw new Error("Internal Server Error: SAVE_USER_CONTRACT_INFORMATION");
  }
};

export const createContractPDF = async (
  dispatch,
  values,
  dataContract,
  clientSignatureUrl,
  ownerSignatureUrl = "https://firebasestorage.googleapis.com/v0/b/helloflatprueba.appspot.com/o/Signature1.png?alt=media&token=f5cb811c-dd0b-4cdc-9158-40546ac70b06"
) => {
  try {
    const contractInfo = { values, clientSignatureUrl, ownerSignatureUrl };

    const res = await axios.post(`/api/pdf_creator`, contractInfo, {
      responseType: "blob",
    });
    const pdfBlob = new Blob([res.data], { type: "application/pdf" });
    7;
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10); // Format YYYY-MM-DD
    const fileName = `contract_${formattedDate}.pdf`;
    const data = await uploadContractPDF(pdfBlob, fileName, "Contratos");
    console.log(dataContract);

    if (data) {
      const clientSignatureUpdate = await axios.patch('/api/user', { id: dataContract.clientId, signature: clientSignatureUrl })
      const contract = await loadContract({ ownerId: dataContract.ownerId, clientId: dataContract.clientId, name: data.name, url: data.url, ...dataContract })
    }
    return dispatch({
      type: "CONTRACT_PDF_DATA",
      payload: data,
    });

  } catch (error) {
    throw new Error("Internal Server Error: SAVE_USER_CONTRACT_INFORMATION");
  }
};

export const getAllProperties = async (dispatch) => {
  try {
    const properties = await axios.get("/api/property")
    return dispatch({
      type: "GET_ALL_PROPERTIES",
      payload: properties.data
    })
  } catch (error) {
    throw new Error({ message: "Internal Server Error: GET_ALL_PROPERTIES", error: error })
  }
}

export const saveToDos = (dispatch, toDos) => {
  return dispatch({
    type: "SAVE_TO_DOS",
    payload: toDos
  })
}

const loadContract = async (data) => {
  const res = await axios.post('/api/contract', data)
  return res
}

export const initialImageState = {
  imageUrl: {}
}

export const initialUserState = {
  user: {}
}
