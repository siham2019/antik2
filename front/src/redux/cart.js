import { ADD_TO_CART, GET_CART, REMOVE_CART } from "../actions/constant/product"


export const cart = (state ={} , action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                success:true,
                products:action.payload,
                message:"item added to the cart "
            }
        case GET_CART:
                return {
                    success:true,
                    products:action.paylod
        }
        case REMOVE_CART:
            return {
         
                products:action.paylod
    }
        default:
            return state
    }
}