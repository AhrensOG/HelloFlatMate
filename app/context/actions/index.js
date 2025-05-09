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

export const saveNotifications = (dispatch, values) => {
    try {
        return dispatch({
            type: "SAVE_NOTIFICATIONS",
            payload: values,
        });
    } catch (error) {
        throw new Error("Internal Server Error: SAVE_NOTIFICATIONS");
    }
};

export const createContractPDF = async (dispatch, values, dataContract, clientSignatureUrl, ownerSignatureUrl, files) => {
    try {
        const contractInfo = { values, clientSignatureUrl, ownerSignatureUrl };

        const res = await axios.post(`/api/pdf_creator`, contractInfo, {
            responseType: "blob",
        });
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        7;
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 10); // Format YYYY-MM-DD
        const timestamp = Date.now(); // Genera un timestamp único
        const fileName = `contract_${formattedDate}_${timestamp}.pdf`;
        const data = await uploadContractPDF(pdfBlob, fileName, "Contratos");

        if (data) {
            const clientSignatureUpdate = await axios.patch("/api/user", {
                id: dataContract.clientId,
                signature: clientSignatureUrl,
            });
            const contract = await loadContract({
                category: values.propertyCategory,
                ownerId: dataContract.ownerId,
                clientId: dataContract.clientId,
                name: data.name,
                url: data.url,
                ...dataContract,
            });
        }

        // create document
        const docInfo = await uploadFiles(files);
        const docUrls = docInfo.map((doc) => doc.url);

        const docData = {
            userId: dataContract.clientId,
            name: "Nómina / Matrícula",
            type: "ROSTER",
            urls: docUrls,
            typeUser: "CLIENT",
            leaseOrderId: values.leaseOrderId,
        };

        await axios.post("/api/document", docData);

        return dispatch({
            type: "CONTRACT_PDF_DATA",
            payload: data,
        });
    } catch (error) {
        throw new Error(error);
    }
};

export const createContractPDFV2 = async (
  values,
  dataContract,
  clientSignatureUrl,
  ownerSignatureUrl,
) => {
  try {
    const contractInfo = { values, clientSignatureUrl, ownerSignatureUrl };

    const res = await axios.post(`/api/pdf_creator`, contractInfo, {
      responseType: "blob",
    });
    const pdfBlob = new Blob([res.data], { type: "application/pdf" });
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10); // Format YYYY-MM-DD
    const timestamp = Date.now(); // Genera un timestamp único
    const fileName = `contract_${formattedDate}_${timestamp}.pdf`;
    const data = await uploadContractPDF(pdfBlob, fileName, "Contratos");

    if (data) {
      await axios.patch("/api/user", {
        id: dataContract.clientId,
        signature: clientSignatureUrl,
      });
      await loadContract({
        category: values.propertyCategory,
        ownerId: dataContract.ownerId,
        clientId: dataContract.clientId,
        name: data.name,
        url: data.url,
        ...dataContract,
      });
    }

  } catch (error) {
    throw new Error(error);
  }
};

export const getAllProperties = async (dispatch) => {
    try {
        const properties = await axios.get("/api/property");
        return dispatch({
            type: "GET_ALL_PROPERTIES",
            payload: properties.data,
        });
    } catch (error) {
        throw new Error({
            message: "Internal Server Error: GET_ALL_PROPERTIES",
            error: error,
        });
    }
};

export const saveToDos = (dispatch, toDos) => {
    return dispatch({
        type: "SAVE_TO_DOS",
        payload: toDos,
    });
};

const loadContract = async (data) => {
    const res = await axios.post("/api/contract", data);
    return res;
};

export const sendEmail = async (emailData) => {
    try {
        const { to, subject, text, html, cc } = emailData;
        
        if (!to || !subject) {
            throw new Error("Missing required email data (to, subject)");
        }

        let mailOptions = {
          to: to,
          subject: subject,
        };

        if (text) {
          mailOptions.text = text;
        }
        if (html) {
          mailOptions.html = html;
        }
        if (cc) {
          mailOptions.cc = cc;
        }
        
        await axios.post("/api/sendGrid", mailOptions);
    } catch (error) {
        console.error("Error al enviar el correo:", error);
    }
};

export const initialImageState = {
    imageUrl: {},
};

export const initialUserState = {
    user: {},
};
