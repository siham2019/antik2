export const review = (state ={}, action) => {
    switch (action.type) {
        case "REVIEW_CREATED":
            return {
                message:action.message
            }
        case "REVIEW_CREATED_ERR":
            return {
                err:action.err
            }
        default:
            return state
    }
}