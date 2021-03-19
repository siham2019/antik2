

export const orderReducer = (state ={}, action) => {
    switch (action.type) {
        case "GET_ALL_ORDERS":{
            return {
              
                order:action.order
            }
        }
       case "ORDER_ERR":{
        return {
              
           err:action.err,
           order:action.order
        }
       }
       case "UPDATE_ORDER":{
        return {
              
           message:action.message,
           order:action.order
        }
       }
       case "ORDER_REMOVED":{
        return {
              
           message:action.message,
           order:action.order
        }
       }
        case "GET_MY_ORDER":{
            return {
              
                order:action.order
            }
        }
        case "GET_SINGLE_ORDER":{
            return {
                success:true,
                order:action.order
            }
        }
        case "GET_SINGLE_ORDER_ERR":{
            return {
                err:action.err
            }
        }
        case "GET_MY_ORDER_ERR":
            return {
              
                err:action.err
            }
        default:
            return state
    }
}