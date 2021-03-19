import React, { useEffect, useState } from 'react'
import BeautyStars from 'beauty-stars'
import { ReviewModal } from './reviewModal'
import { addTOCart, getCart } from '../../../redux/actions/cart'
import { useDispatch, useSelector } from 'react-redux'

export const Detail = (props) => {
      
       const [Qte, setQte] = useState(1)
       const dispatch = useDispatch()
       const product = useSelector(state => state.cart)
    const addToCart=()=>{
         let p; 
         let n={
            name:props.product.name,
            priceu:props.product.price,
            image:props.product.image[0].url,
            quantity:Qte,
            productId:props.product._id,
            price:Qte*props.product.price
        }
        if (product.products!==undefined) {
            p=product.products
            p.push(n)
        } else {
            p=[]
            p.push(n)
        }
            

           dispatch(addTOCart(p))
    }

    useEffect(() => {
          dispatch(getCart())
           
     }, [])
 
     const increment=()=>{
        
      
        
         if(Qte>=props.product.stock)    setQte(1);
        else setQte(Qte+1)
    }

    const decrement=()=>{
        setQte(Qte-1)
    }


    return (
        <div className="col-6">
                <div className="d-flex justify-content-between">
                  <h3>{props.product.name}</h3>
                  <h4 className="mt-1"> {props.product.price} DA</h4>
                  </div>

                  <div className="d-flex my-2 ">
                   <div className=" mt-1 ">
                   <BeautyStars   value={props.product.moy_rating} maxStars={6} size="14px" activeColor="gold" inactiveColor="rgba(184, 178, 178, 0.747)"/>
                    </div>   
                   <small className="ml-1 "> ({props.product.number_reviews} reviews) </small>
                   </div>
                    <h6  className={props.product.stockStatus==="out stock"?"text-danger my-3":"text-info my-3"}>{props.product.stockStatus}</h6>
                    <div className="d-flex my-3">
                        <h6 className="mt-2">Qte : {Qte} </h6>
                        <div className="ml-2 btn-group">
                        <button  className="btn btn-outline-secondary px-4"  disabled={Qte<=1?true:false} type="button" onClick={decrement}>-</button>
                        <button  className="btn btn-outline-secondary px-4" type="button" 
                        onClick={increment}>
                            +</button>
                        </div> 
                    </div>
                   <h4>description</h4>
                   <hr/>
                   <p>{props.product.description}</p>
                   <button type="button" className="mt-3 container btn btn-danger " onClick={addToCart} disabled={props.product.stock===0?true:false}>ADD TO THE CART</button>
                   <button type="button" className="mt-2 container btn btn-dark "  data-toggle="modal" data-target="#exampleModal">ADD A REVIEW</button> 
                   <ReviewModal id={props.id}/>
        </div>
    )
}
