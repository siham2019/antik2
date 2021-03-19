import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart, removeCart } from '../../redux/actions/cart'
import { Header } from '../Header'
import { useHistory } from "react-router-dom"
import { Checkout } from './checkout'

export const Cart = () => {
    
    const [change, setchange] = useState()  
    const dispatch = useDispatch()
    const [price, setprice] = useState(0)

    const cart = useSelector(state => state.cart.products)

   const remove=(i)=>{
      setchange(true)
      dispatch(removeCart(i,cart))
   }
    
  
    useEffect(() => {
     
        dispatch(getCart())
        if(cart) setprice(cart.reduce((a,c)=>a+c.price,0))
        setchange(false)
   }, [dispatch,change])
  
  
   if( !cart || cart.length===0 ) return <div> <Header/>cart is empty</div>
    return (
        <div>
            <Header/>
         <div className="mx-5">
             <h4>the shopping cart</h4>
           <div className="row ">
           <div className="col-10 mt-4">
            <table className="table ">
                <thead>
                    <tr>
                        <th>item</th>
                        <th>quantity</th>
                        <th >total price</th>
                    </tr>
                </thead>
                <tbody>
                   
                   {
                       cart.map((c,i)=>{
                           return( <tr>
                            <td className="w-50">
                             <div className="d-flex">
                          
                                 <img src={c.image} className="card1" alt="name of produxt"/>
                               
                                <div className="ml-3">
                                 <h6 className="mt-2">{c.name}</h6>
                                  <p>{c.priceu} DA</p>
                                  <button type="button" className="btn btn-outline-secondary" onClick={()=>remove(i)}>x remove</button>
                               </div>
                             </div>
                            </td>
    
                            <td >{c.quantity}</td>
                            <td >{c.price} DA</td>
                        </tr>)
                       })
                   }
                  
                </tbody>
            </table> 
          </div>

           <div className="col-2 ch p-3">
             <div className="d-flex justify-content-between">
                 <h5>subtotal</h5>
                 <p>{price} DA</p>
             </div>
             <div className="d-flex justify-content-between">
                 <h6>shipping price</h6>
                 <p>500 DA</p>
             </div>
             <hr/>
             <div className="d-flex justify-content-between">
                 <h4>TOTAL</h4>
                 <p>{price+500} DA</p>
             </div>
              <button type="button" className="btn btn-danger container" data-toggle="modal" data-target="#exampleModal">
                   checkout
                </button>
{/*              <button type="button" className="btn btn-danger container" onClick={checkout}>checkout</button>
 */}           </div>
           </div>
         </div>
         
         <Checkout amount={price+500} />
        </div>
    )
}
