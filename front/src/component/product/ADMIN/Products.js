import React, { useEffect } from 'react'
import { Header } from '../../Header'
import { useSelector,useDispatch } from "react-redux";
import { getProduct,removeP,removePA } from '../../../redux/actions/productAction';
import { Redirect } from 'react-router'

export const Products = () => {

    const product = useSelector(state => state.productReducer)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
      
        dispatch(getProduct({keyword:"",category:""}))

    }, [dispatch])




    const remove=(id)=>{
          dispatch(removeP(id))
    }
    const deleteAll=()=>{

        dispatch(removePA())

    }



    if(user.isd===2) return <Redirect to="/" />
    return (
        <div>
            <Header/>
            <div className="mx-5">
               <h4>Products</h4>
               <div> 
                   
                   
                   <a  className="btn btn-success text-light" href="/admin/products/create">+ add new product</a>
                   <button type="button" className="btn btn-danger ml-2" onClick={deleteAll}>delete all</button>
               
               
               
               </div>
               <div className="row ">
                      <div className="col-10 mt-4 mx-auto">
                         <table className="table ">
                               <thead>
                                 <tr>
                                      <th>item</th>
                                       <th>stock</th>
                                       <th >action</th>
                                   </tr>
                              </thead>
                                <tbody>
                   
                                  {
                                      product.product?.length>0? product.product.map((e,i)=><>
                                      <tr>
                                      <td className="w-50">
                                          <div className="d-flex">
                             
                                             <img src={e.image[0].url} className="card1" alt="name of produxt"/>
                               
                                              <div className="ml-3">
                                                      <h6 className="mt-2">{e.name}</h6>
                                                      <p>{e.price} DA</p>
                                              </div>
                                          </div>
                                       </td>
                                       <td>{e.stock}</td>
                                       <td>

                                         <div>
                                             <a className="btn btn-primary mr-2" href={"/admin/products/update/"+e._id}>update</a>
                                             <button type="button" className="btn btn-danger" onClick={()=>remove(e._id)}>- remove</button>

                                         </div>



                                       </td>
                                    </tr>
                                      </>):<tr><td>there is no products</td></tr>
                                  }
                                </tbody>
                         </table> 
                     </div>
               </div>
         </div>  
     </div>
    )
}
