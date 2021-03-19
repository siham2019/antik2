import { GET_ALL_PRODUCT, REQUEST_FAIL, REQUEST_SUCCESS } from "./actions/constant/product"


export const productReducer = (state = {product:[]}, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCT:
            return {
                load:action.load,
                product:[]
            }
        case REQUEST_SUCCESS:
            return {
                load:action.load,
                product:action.payload.product,
                maxPrice:action.payload.maxPrice,
                count:action.payload.count,
                minPrice:action.payload.minPrice
            }
            case "PRODUCT_CREATED":
                return {
                    message:action.message
                }
                case "PRODUCT_REMOVED":
                    return {
                        product:action.product,
                        message:action.message
                    }
                case "PRODUCT_ERR":
                    return {
                        err:action.err
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
