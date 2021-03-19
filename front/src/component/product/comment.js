import React from 'react'
import BeautyStars from 'beauty-stars'
import { useDispatch, useSelector } from 'react-redux'
import { removeReview } from '../../redux/actions/productAction'

export const Comment = (props) => {
    
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();


    const removeR=()=>{
           dispatch(removeReview(props.id,props.pid));
    }


    return (
        <div className="ml-5">
        <div className="d-flex mt-4">
             <img className="avatar mr-2" alt="avatar" src={props.img}/>
            <div>
            <h6 className="mt-2">{props.name}</h6>

                <BeautyStars   value={props.rating} maxStars={6} size="10px" activeColor="gold" inactiveColor="rgba(184, 178, 178, 0.747)"/>
                <small>Reviewed in : {new Date(props.createdAt).toGMTString()}</small>

            </div>
            <div className="ml-auto">
               {user.isd==1? <button type="button"  className="btn btn-danger" onClick={removeR}><i className="far fa-trash-alt"></i></button>:""}
            </div>
         </div>
         <div className="ml-3 mt-2">
            
           
            <p className="mb-0 mt-2">{props.comment}</p>
           
         </div>
         <hr/>
        </div>
    )
}
