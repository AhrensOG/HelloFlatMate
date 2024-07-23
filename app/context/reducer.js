export const reducer = (state, action) => {
    switch (action.type) {

        case "SET_IMAGE_URL":
            return {
                ...state,
                imageUrls: {
                    ...state.imageUrls,
                    [action.payload.id]: action.payload.url,
                },
            };

        case "SET_USER":
            return {
                ...state,
                user: action.payload
            }

        default:
            return { ...state }
    }
}