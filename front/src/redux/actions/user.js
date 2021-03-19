import axios from "axios";
import cookie from 'react-cookies'
import { LOGIN, LOGIN_FAIL, REGISTER, REGISTER_FAIL } from "./constant/user";


export const changePassword=(password,newpass)=>(dispatch)=>{
              const token=cookie.load("token")
              axios.post("/api/me/password/change",{olDpassword:password,token:token,newPassword:newpass})
                .then((res)=> {
                  dispatch({type:"CHANGE_PASSWORD",message:res.data.message})
                }).catch(err=> {  
                           if(err.response.status===400) dispatch({type:"CHANGE_PASSWORD_ERR",message:{...err}.response.data.message,isa:true})
                          })
               

}

export const updateProfile=(newinfo)=>(dispatch)=>{
  const token=cookie.load("token")
  axios.post("/api/me/profile/update",{...newinfo,token:token})
    .then(()=> {
      dispatch({type:"PROFILE_UPDATED",isa:true})
    }).catch(err=> {  

               if(err.response.status===400 ) 
               dispatch({type:"UPDATE_PROFILE_ERR",err:{...err}.response.data.message,isa:true})
               if(err.response.status===401 ) 
               dispatch({type:"UPDATE_PROFILE_ERR",err:{...err}.response.data.message,isa:false})
              
              
              
              })
}


export const register = (user) =>(dispatch)=>{
    
      axios.post("/api/register",user).then(()=> {   

                    dispatch({type:REGISTER})
              }).catch(err=>{

                  const e={...err}
                dispatch({type:REGISTER_FAIL,err:e.response.data.message})
             
            })

};

export const ifAuthenticate=()=>dispatch=>{
            const isa=cookie.load("token");
            const isd=cookie.load("r")

            dispatch({type : "ifAuthenticate",isa:isa?true:false,isd:isd})
}

export const getProfile=()=>(dispatch)=>{
  const isa=cookie.load("token");
  axios.post("/api/me/profile",{token:isa})
  .then((res)=>{

    dispatch({type:"GET_PROFILE",user:res.data.user,isa:true,isd:cookie.load("r")})

  }).catch(err=>{

    const e={...err}
    console.log(err);

 
})

}

export const signout=()=>(dispatch)=>{


    cookie.remove("token")
    cookie.remove("r")
    dispatch({type:"LOGOUT"})



}


export const login=(user)=>(dispatch)=>{

  axios.post("/api/login",user)
  .then((res)=>{
    
    cookie.save("token",res.data.token,{expires:new Date(7*24*60*60*1000 + Date.now())})
       dispatch({type:LOGIN})
      
       if(res.data.role==="admin")
          cookie.save("r","1",{expires:new Date(7*24*60*60*1000 + Date.now())})
        else
        cookie.save("r","2",{expires:new Date(7*24*60*60*1000 + Date.now())})

  }).catch(err=>{
    
    const e={...err}

  dispatch({type:LOGIN_FAIL,err:e.response.data.message})

})


}