import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllOrder, removeOrder, updateOrder } from '../../redux/actions/order';
import { Header } from '../Header';

export const OrderAdmin = () => {
  
    const user = useSelector(state => state.user)
    const order = useSelector(state => state.orderReducer)
    const dispatch = useDispatch()
    
    
    useEffect(() => {
          dispatch(getAllOrder())      
    }, [dispatch])


    const remove=(id)=>{
         dispatch(removeOrder(id,order.order))
         setTimeout(() => {
             window.location.reload()
         }, 2000);
    }


     const save=(id,i)=>{
        let x = document.getElementsByClassName("select")[i].selectedIndex;
           console.log( document.getElementsByTagName("option")[x].value);
       dispatch(updateOrder(id,   document.getElementsByTagName("option")[x].value
        ,order.order))
        setTimeout(() => {
            window.location.reload()
        }, 2000);
     }



    if(user.isd===2) return <Redirect to="/" />

    return (
        <div>
        <Header/>
        <div className="mt-2 container">
        <h4>  ORDERS</h4>
      

            {
                order.err &&        <div className="alert alert-danger" role="alert">
            
                     {order.err}
            
              </div>}    
     
              {
                order.message &&        <div className="alert alert-success" role="alert">
            
                     {order.message} wait 2s...
            
              </div>}  
           <table className="table my-5">
               <thead>
                   <tr>
                       <th>created at</th>
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
                              <td>{e.shipingInfo.adress}</td>
                              <td>{e.totalPrice}</td>
                              <td>
                                 <div className="form-group">
                                     <label className=" mx-2">{e.orderStatus}</label>
                                   <select className="form-control" className="select" >
                                      <option value="delivered">delivered</option>
                                      <option value="processing">processing</option>
                                       
                                   </select>
                                 </div> 
                              </td>
                       <td>
                          <div className="d-flex">
                          <a href={`/order/${e._id}`} className="mt-2">
                               <i className="far fa-eye"></i>
                                view 
                            </a>
                            <button type="button"  className="btn btn-primary ml-2" onClick={()=>save(e._id,i)}>save </button>
                            <button type="button"  className="btn btn-danger ml-2" onClick={()=>remove(e._id)}>remove </button>

                          </div>

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
