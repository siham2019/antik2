import React, { useEffect } from 'react'
import { Detail } from './ProductDetail/Detail'
import { Image } from './ProductDetail/Image'
import { ViewComments } from './viewComments'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetail } from '../../redux/actions/productAction'
import { Header } from '../Header'

export const ProductDetail = (props) => {

    const product = useSelector(state => state.productDetailReducer)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getProductDetail(props.match.params.id))
      }, [dispatch])




   if(product.load) return <div>loading ...</div>
    return (
        <div>
              <Header/>
        <div className="container">
            {product.err && <div className="alert alert-danger" role="alert">
               {product.err}
            </div>}

            {cart.message && <div className="alert alert-success" role="alert">
               {cart.message}
            </div>}


            {
            !product.err && <>  <div className="row">
              <div className="col-6">
               <Image image={product.product.image}/>
              </div>
              <Detail product={product.product} id={props.match.params.id}/>
          </div>
   
      <ViewComments review={product.product.review} pid={props.match.params.id}/></>
            }   
        </div></div>
    )
}
