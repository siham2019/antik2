import { LOGIN, LOGIN_FAIL, REGISTER, REGISTER_FAIL } from "./actions/constant/user"

export const user = (state ={}, action) => {
    switch (action.type) {
        case REGISTER:
            return {
                success:true
            }
       
        case "CHANGE_PASSWORD":return{
            isa:action.isa,
            message:action.message,
            success:true
        }
  
    case "PROFILE_UPDATED":return{
        isa:action.isa,
        success:true
    }
    
    case "UPDATE_PROFILE_ERR":return{
        err:action.err,
        isa:action.isa
    }
        case "CHANGE_PASSWORD_ERR":return{
            message:action.message,
            success:false,
            isa:action.isa,
        }
        case REGISTER_FAIL: return{
            err:action.err
        }
        case "ifAuthenticate":return {
          isa:action.isa,
          isd:action.isd
        }
        case "GET_PROFILE":return{
            user:action.user,
            success:true,
           isa:true
           ,isd:action.isd
        }
        case "GET_PROFILE_FAIL":return{
            err:action.err,
            isa:false
        }
        case LOGIN:return {
            success:true,
            isd:action.isd
        }
        case "LOGOUT":return {}
        case LOGIN_FAIL: return{
            err:action.err,
            isa:false
        }

        default:
            return state
    }
}
