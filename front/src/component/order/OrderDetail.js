import React, { useEffect } from 'react'
import { Header } from '../Header'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { getSingleOrder } from '../../redux/actions/order'

export const OrderDetail = (props) => {

    const user = useSelector(state => state.user)
    const order = useSelector(state => state.orderReducer)
    const dispatch = useDispatch()


  useEffect(() => {
         
      dispatch(getSingleOrder(props.match.params.idr))

  }, [dispatch])
   
  console.log(order);
   
   if(user.isa===false) return <Redirect to="/login"/>
    return (
        <div>
            <Header/>
            
            <div className="mx-5">

                 <h4>the order details</h4>
                {
                    order.err && <div className="alert alert-danger" >
                     {order.err}
                    </div> 
                }
                  {
                     order.success &&  <div className="row ">
                      <div className="col-10 mt-4 mx-auto">
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
                                    order?.order?.items.map((e,i)=><>
                                    
                                    
                                    <tr key={i}>
                                   <td className="w-50">
                                    <div className="d-flex">
                         
                                        <img src={e.image} className="card1" alt="name of produxt"/>
                              
                                     <div className="ml-3">
                                         <h6 className="mt-2">{e.name}</h6>
                                          <p>{e.price/e.quantity} DA</p>
                                     </div>
                                   </div>
                                   </td>
                          
                                    <td>{e.quantity}</td>
                                    <td>{e.price} DA</td>
                                </tr>
                                    
                                    
                                    
                                    
                                    </>)
                                }
                 
                               </tbody>
                         </table> 
                    </div>

                   </div>
                  }
              </div>
        </div>
    )
}
