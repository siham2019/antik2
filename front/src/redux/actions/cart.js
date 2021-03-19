import { ADD_TO_CART, GET_CART, REMOVE_CART } from "./constant/product"

import cookie from 'react-cookies'

export const addTOCart=(pros)=>(dispatch)=>{
    
    cookie.save("cart",pros,{path:"/"})

     dispatch({
        type:ADD_TO_CART,
        paylod:pros
    })
}
export const removeCart=(i,cart)=>{return (dispatch)=>{
    const copy=cart
    copy.splice(i,1);
    cookie.save("cart",copy,{path:"/"})

    dispatch({
       type:REMOVE_CART,
       paylod:copy
   })
  }
}

export const getCart=()=>(dispatch)=>{
    
    const pros=cookie.load("cart")

     dispatch({
        type:GET_CART,
        paylod:pros
    })
}
