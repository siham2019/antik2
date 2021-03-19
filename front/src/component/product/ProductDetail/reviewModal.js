import BeautyStars from 'beauty-stars'
import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { createReview } from '../../../redux/actions/review'

export const ReviewModal = (props) => {

    const [Rating, setRating] = useState(0)
    const [comment, setcomment] = useState("")

   const review = useSelector(state => state.review)
   const dispatch = useDispatch() 

   const saveChange=(e)=>{
            
               e.preventDefault()
               dispatch(createReview(props.id,{
                 rating:Rating,
                 comment:comment
               })
               )
    }



    return (
<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
     
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
         <form onSubmit={saveChange}>

         <div className="modal-body">
           
          
             {
                review.message &&  <div class="alert alert-success" role="alert">
                  {review.message}
                </div>
             }  
           {
                review.err &&  <div class="alert alert-danger" role="alert">
                  {review.err}
                </div>
             } 

          <div className="form-group">
            <label >Rating : </label>
            <BeautyStars   value={Rating} onChange={(e)=>setRating(e)} maxStars={6} size="25px" activeColor="gold" inactiveColor="rgba(184, 178, 178, 0.747)"/>
             <label className="mt-3">comment : </label>
             <input type="text" className="form-control" placeholder="enter the comment" value={comment} onChange={(e)=>setcomment(e.target.value)} required/>
          </div>
         </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-danger" >Save changes</button>
       </div>



         </form>
    </div>
  </div>
</div>
    )
}
