import axios from "axios";
import cookie from "react-cookies";

export const createReview = (id,review) => {
    return  dispatch => {
       const token=cookie.load("token")
        
       axios.post(`/api/product/review/${id}`,{...review,token:token})
          .then((res)=>{
              dispatch({type:"REVIEW_CREATED",message:res.data.message})
          })
          .catch((err)=>{

            dispatch({type:"REVIEW_CREATED_ERR",err:{...err}.response.data.message})

          })
    };
};