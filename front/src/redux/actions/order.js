import axios from 'axios'
import cookie from 'react-cookies'




export const removeOrder = (id,order) => {
    return  dispatch => {
        const token=cookie.load("token")
    
        axios.post(`/api/order/remove/${id}`
        ,{token:token})
        .then(()=>{
           
            dispatch({
                type: "ifAuthenticate",
                isd:1,
                isa:true
               })
               dispatch({
                type: "ORDER_REMOVED",
                message:"order removed",
                order:order
               })
        })
        .catch((err)=>{

            if({...err}.response.status===404)
              {
             
                  
                 dispatch({
                    type: "ORDER_ERR",err:{...err}.response.data.message
                   })
             }
            if({...err}.response.status===401)
              {
                  cookie.remove("r")
                  cookie.remove("token")
                  
                 dispatch({
                    type: "ifAuthenticate",
                    isa:false
                   })
             }
            if({...err}.response.status===403)
              {
                
                cookie.save("r","2")
                 dispatch({
                    type: "ifAuthenticate",
                    isd:2,
                    isa:true
                   })
             }
    });
}
};



export const updateOrder = (id,status,order) => {
    return  dispatch => {
        const token=cookie.load("token")
    
        axios.post(`/api/order/update/${id}`
        ,{token:token,orderStatus:status})
        .then((res)=>{
           
            dispatch({
                type: "ifAuthenticate",
                isd:1,
                isa:true
               })
               dispatch({
                type: "UPDATE_ORDER",
                message:"order updated",
                order:order
               })

        })
        .catch((err)=>{

            if({...err}.response.status===400)
              {
             
                  
                 dispatch({
                    type: "ORDER_ERR",err:{...err}.response.data.message,order:order
                   })
             }
            if({...err}.response.status===401)
              {
                  cookie.remove("r")
                  cookie.remove("token")
                  
                 dispatch({
                    type: "ifAuthenticate",
                    isa:false
                   })
             }
            if({...err}.response.status===403)
              {
                
                cookie.save("r","2")
                 dispatch({
                    type: "ifAuthenticate",
                    isd:2,
                    isa:true
                   })
             }
    });
}};

export const  getAllOrder= () => {
    return  dispatch => {
  
            const token=cookie.load("token")
    
            axios.post("/api/order/all",{token:token})
            .then((res)=>{
                  
            dispatch({
                type: "ifAuthenticate",
                isd:1,
                isa:true
               })
              dispatch({type:"GET_ALL_ORDERS",order:res.data.order})
            })
            .catch((err)=>{

                if({...err}.status=401)
                  {
                      cookie.remove("r")
                      cookie.remove("token")
                      
                     dispatch({
                        type: "ifAuthenticate",
                        isa:false
                       })
                 }
                if({...err}.status=403)
                  {
                      cookie.save("r","2")
                     dispatch({
                        type: "ifAuthenticate",
                        isd:2,
                        isa:true
                       })
                 }

            })
     
    };
};

export const getMyOrder=()=>(dispatch)=>{
    try {
          
    const token=cookie.load("token")
    
    axios.post("/api/order/me",{token:token})
    .then(res=>{
    
        dispatch({
        type: "GET_MY_ORDER",
        order:res.data.order
     })
    
    })
    .catch((err)=>{
        
         if({...err}.status=400)
         dispatch({
            type: "GET_MY_ORDER_ERR",
            err:{...err}.response.data.message
           })
})

    

    } catch (error) {
        
    }
}

export const getSingleOrder = (idr) => {
    return  dispatch => {
        
        
                   
        const token=cookie.load("token")
    
      axios.post(`/api/order/${idr}`,{token:token})
         .then((res)=>{

             dispatch({type:"GET_SINGLE_ORDER",order:res.data.order})

         }).catch ((err)=>{

            if({...err}.response.status===404){
              
                dispatch({type:"GET_SINGLE_ORDER_ERR",err:{...err}.response.data.message})
            }

        }) 


       

    };
};