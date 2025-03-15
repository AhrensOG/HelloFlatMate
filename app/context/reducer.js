export const reducer = (state, action) => {
    switch (action.type) {
        case "GET_ALL_PROPERTIES":
            return {
                ...state,
                properties: [...action.payload],
            };
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
        case "SAVE_TO_DOS":
            return {
                ...state,
                toDos: action.payload,
            };
        case "SET_NOTIFICATIONS":
            return {
                ...state,
                notifications: action.payload, // Sobrescribe el estado con las nuevas notificaciones
            };
        case "ADD_NOTIFICATION":
            // Evita duplicados basándose en el `id`
            const isDuplicate = state.notifications.some((notif) => notif.id === action.payload.id);
            if (isDuplicate) return state;

            return {
                ...state,
                notifications: [action.payload, ...state.notifications], // Agrega al inicio
            };
        case "SET_UNREAD_COUNT":
            return {
                ...state,
                unreadCount: action.payload,
            };
        case "UPDATE_UNREAD_COUNT":
            return {
                ...state,
                unreadCount: action.payload, // Asegura que el nuevo estado se asigna correctamente
            };

        default:
            return { ...state };
    }
};
