import React from 'react'
import { Comment } from './comment'

export const ViewComments = (props) => {
    return (
        <div className="container mt-5 pl-5 ">
            <h4><i className="far fa-comments"></i> custmor reviews</h4>
            <hr/>
             {
                props.review?.length>0?props.review.map((r,i)=><Comment key={i} pid={props.pid} id={r._id} rating={r.rating} createdAt={r.createdAt} img={r.image} name={r.name} comment={r.comment} />):
                <p>no comments is added for instant</p>
             }
             
        </div>
    )
}
