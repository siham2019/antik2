import { GET_ALL_PRODUCT, GET_SINGLE_PRODUCT, REQUEST_FAIL, REQUEST_SUCCESS } from "./constant/product"
import axios from "axios"
import cookie from "react-cookies"



export const removeReview=(id,pid)=>(dispatch)=>{

    const token=cookie.load("token")

        axios.post("/api/product/review/delete/?idr="+id+"&pid="+pid,{token:token})
           .then(()=>window.location.reload())
           .catch(err=>{
            if({...err}.response.status===400)
            {
                console.log({...err}.response.status)
                
               dispatch({
                  type: "PRODUCT_ERR",err:{...err}.response.data.message
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
        }
        )


}



export const getProduct=(query)=>(dispatch)=>{
                        
        dispatch({type:GET_ALL_PRODUCT,load:true})
         
        let queryString="/api/product/all?keyword="+query.keyword
        const category=query.category?.length>0?"&category="+query.category:""
        
        if(query.price>0) queryString= queryString+"&price[lte]="+query.price;
        axios.post(queryString+category+"&page="+query.page,{page:query.limit}).then(res=>{
            const payload={
                product:res.data.product,
                count:res.data.count,
                maxPrice:res.data.maxPrice,
                minPrice:res.data.minPrice,
            }

            dispatch({type:REQUEST_SUCCESS,load:false,payload:payload})
            
        }).catch(err=>   dispatch({type:REQUEST_FAIL,load:false,err:err.message}))
 
}


export const removePA=()=>{
    
    return (dispatch)=>{

        const token=cookie.load("token")

        axios.post("/api/product/delete/all",{token:token})
        .then(()=>{ 
            dispatch({type:"PRODUCT_REMOVED",message:"the products removed wait 2 seconds...",product:[]})
        })
        .catch((err)=>{
            if({...err}.response.status===400)
            {
              dispatch({
                  type: "PRODUCT_ERR",err:{...err}.response.data.message
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
        })

     }

   }



export const removeP=(id)=>{
    
    return (dispatch)=>{

        const token=cookie.load("token")

        axios.post("/api/product/delete/"+id,{token:token})
        .then((res)=>{ 
            dispatch({type:"PRODUCT_REMOVED",message:"the product removed wait 2 seconds...",product:res.data.product})
        })
        .catch((err)=>{
            if({...err}.response.status===400)
            {
           
                
               dispatch({
                  type: "PRODUCT_ERR",err:{...err}.response.data.message
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
        })

     }

   }

export const getProductDetail=(id)=>{
    return (dispatch)=>{
                        
        dispatch({type:GET_SINGLE_PRODUCT,load:true})

        axios.get("/api/product/"+id).then(res=>{

            const payload={
                product:res.data.product,
            
            }

            dispatch({type:REQUEST_SUCCESS,load:false,payload:payload})
            
        }).catch((err)=>   {
            dispatch({type:REQUEST_FAIL,load:false,err:{...err}.response.data.message})
        
        })
 
}
}


export const updateProduct=(product)=>(dispatch)=>{

    const token=cookie.load("token")

    axios.post("/api/product/update/"+product.id,{...product,token:token}).then(()=>{
         dispatch({type:"PRODUCT_CREATED",message:"the product is updated"})
    }).catch(err=>{
        if({...err}.response.status===400)
        {
       
            
           dispatch({
              type: "PRODUCT_ERR",err:{...err}.response.data.message
             })
       }
      if({...err}.response.status===401 || {...err}.response.status===403)
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
    })




}





export const createProduct=(product)=>(dispatch)=>{

    const token=cookie.load("token")

    axios.post("/api/product/new",{...product,token:token}).then(()=>{
         dispatch({type:"PRODUCT_CREATED",message:"the product is created"})
    }).catch(err=>{
        if({...err}.response.status===400)
        {
       
            
           dispatch({
              type: "PRODUCT_ERR",err:{...err}.response.data.message
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
    })


}