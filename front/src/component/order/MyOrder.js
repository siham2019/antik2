import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { getMyOrder } from '../../redux/actions/order'
import { Header } from '../Header'

export const MyOrder = () => {

    const user = useSelector(state => state.user)
    const order = useSelector(state => state.orderReducer)
    
    const dispatch = useDispatch()

    useEffect(() => {
     
        dispatch(getMyOrder())

    }, [dispatch])




    if(user.isa===false) return <Redirect to="/login"/>
    return (
        <div>
            <Header/>
            <div className="mt-2 container">
            <h4> <i className="fas fa-history"></i> THE HISTORY OF YOUR ORDERS</h4>
               <table className="table my-5">
                   <thead>
                       <tr>
                           <th>created at</th>
                           <th>paid at</th>
                           <th>shipping adress</th>
                           <th>total price</th>
                           <th>status</th>
                           <th>action</th>
                       </tr>
                   </thead>
                   <tbody>
                      {
                        order.order?.length>0? order.order.map((e,i)=>{
                              return <>
                              
                              <tr key={i}>
                                  <td>{new Date(e.createdAt).toGMTString()}</td>
                                  <td>{new Date(e.paidAt).toGMTString()}</td>
                                  <td>{e.shipingInfo.adress}</td>
                                  <td>{e.totalPrice}</td>
                                   <td>{e.orderStatus}</td>
                           <td>
                               <a href={`/order/${e._id}`}>
                                   <i className="far fa-eye"></i>
                                    view more
                                </a>
                         </td>
                       </tr>
                              
                              </>
                          }):<tr><td colSpan="6">there is no order for instant</td></tr>
                      }
                      
                   </tbody>
               </table>
            </div>
        </div>
    )
}
