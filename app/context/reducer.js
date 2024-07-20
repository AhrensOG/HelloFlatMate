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

        default:
            return { ...state }
    }
}