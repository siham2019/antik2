import React, { useState } from "react";
import axios from 'axios';
import cookie from 'react-cookies'
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';


const stripePromise = loadStripe("pk_test_51IHZTMGITsTpVqczubNEzGmtPzRsXRSkVHzSr1gpIGCD5RnCSJvuuBnMCjRF0rYF7qmmGeONPoXABxXG2hKYqEKp006f1cx3QZ")

const Form=(props)=>{
  
  const stripe = useStripe();
  const elements = useElements();

    const [adress, setadress] = useState("")
    const [city, setcity] = useState("")
    const [country, setcountry] = useState("")

  const onSubmit = async(ev)=>{
    ev.preventDefault()
    const e= await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
  });
    
    const g=cookie.load("cart")
   axios.post("/api/order/create",
   { token:cookie.load("token"),
        amount:props.amount,
        description:"confirm your order",
     shipingInfo:{
       adress:adress,
       postalCode:e. paymentMethod.billing_details.address.postal_code,
       country:country,
       city:city,
      },
      paymentInfo:{
        id:e.paymentMethod.id 
      },
      items:g
      ,
     totalPrice: props.amount,
     currency: "DZD",
   }).then(()=>{
               cookie.remove("cart")
               window.location.reload()
           })
    .catch(err=>console.log(err))
    


}



  return(   <form onSubmit={onSubmit} >
    <CardElement  options={{
    style: {
 
      invalid: {
        color: '#9e2146',
      },
    },
  }} />
   <div className="form-group">
     <input type="text" className="form-control" placeholder="enter your country" required value={country} onChange={(e)=>setcountry(e.target.value)}/>
   </div>
   <div className="form-group"> 
     <input type="text" className="form-control" placeholder="enter your city"required value={city} onChange={(e)=>setcity(e.target.value)}/>
   </div>
   <div className="form-group"> 
     <input type="text" className="form-control" placeholder="enter your adress"required value={adress} onChange={(e)=>setadress(e.target.value)}/>
   </div>
    <button type="submit"  className="btn btn-danger container mt-3" disabled={!stripe}>
        Pay
    </button>
</form>)
}




//component

export const Checkout = (props) =>{





  const user = useSelector(state => state.user)
  

return( 
      <div className="modal fade px-5" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document"></div>
    <div className="modal-content">
      <div className="modal-header">
       
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        
          <div className="modal-body">
               {user.isa===true?<>
  
                   <Elements stripe={stripePromise}>
                           <Form amount={props.amount}/>
                    </Elements>

                      </>: <div className="alert alert-danger">please login </div>
                }
          </div>
          
      </div>
    </div>
</div>) 

}