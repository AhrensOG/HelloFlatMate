export const reducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_PROPERTIES":
      console.log(action.payload);
      return {
        ...state,
        properties: [
          ...action.payload,
        ]
      }
    case "SAVE_USER_CONTRACT_INFORMATION":
      return {
        ...state,
        reservationInfo: {
          ...state.reservationInfo,
          userContractInformation: action.payload,
        },
      };
    case "SAVE_USER_CONTRACT_DOCUMENTS":
      return {
        ...state,
        reservationInfo: {
          ...state.reservationInfo,
          [action.payload.id]: action.payload.files,
        },
      };
    case "CONTRACT_PDF_DATA":
      return {
        ...state,
        contractPdfData: action.payload,
      };
    case "IS_USER_LOGGED":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return { ...state };
  }
};
