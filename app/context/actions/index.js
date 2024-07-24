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
    return dispatch({
      type: "CONTRACT_PDF_DATA",
      payload: data,
    });
  } catch (error) {
    throw new Error("Internal Server Error: SAVE_USER_CONTRACT_INFORMATION");
  }
};

export const initialImageState = {
    imageUrl: {}
}

export const initialUserState = {
    user: {}
}
