import React from 'react'
import BeautyStars from 'beauty-stars';

export const Product = (props) => {
    return (
        <div className=" card col-4 text-center ml-3 mt-4">
        <img className="card-img-top w-100"  src={props.img} alt="Card  cap"/>
            <div className="card-body mx-auto">
                 <a href={"/product/"+props.id}><h6 className="card-title">{props.name}</h6></a>
                 <BeautyStars   value={props.moy_rating} maxStars={6} size="10px" activeColor="gold" inactiveColor="rgba(184, 178, 178, 0.747)"/>
                       <p className="card-text">{props.price} DA</p>
                       <a href={"/product/"+props.id} className="btn btn-outline-info col-12">view more detail</a>

             </div>
       </div>
    )
}
