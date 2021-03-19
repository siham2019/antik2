import { GET_SINGLE_PRODUCT, REQUEST_FAIL, REQUEST_SUCCESS } from "../actions/constant/product"


export const productDetailReducer = (state = {product:{}}, action) => {
    switch (action.type) {
        case GET_SINGLE_PRODUCT:
            return {
                load:action.load,
                product:{}
            }
        case REQUEST_SUCCESS:
            return {
                load:action.load,
                product:action.payload.product,
                
            }
        case REQUEST_FAIL:
                return {
                    load:action.load,
                    product:[],
                    err:action.err
                }
        default:
            return state
    }
}