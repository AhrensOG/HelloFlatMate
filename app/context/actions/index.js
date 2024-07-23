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
