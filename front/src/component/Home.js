import React, { useEffect, useState } from 'react'
import { getProduct } from '../redux/actions/productAction'
import { Product } from './product/product'
import { useSelector,useDispatch } from "react-redux";
import { Header } from './Header';
import { MPagination } from './product/pagination';

export const Home = () => {
 
    const product = useSelector(state => state.productReducer)
    const dispatch = useDispatch()

    const [keyword, setkeyword] = useState("")
    const [category, setcategory] = useState("")
    const [price, setprice] = useState(0)
    const [page, setpage] = useState(1)
    
    const pageit=(pageNumber)=>{
      setpage(pageNumber);
    }

  const [catogories, setcatogories] = useState([
  {name:"",ischecked:true},    
  {name:"beauty",ischecked:false},
  {name: "health",ischecked:false},
  {name:"shoes",ischecked:false},
  {name:"skirt",ischecked:false},
  {name:"pant",ischecked:false},
  {name:"accessory",ischecked:false},
  {name:"sport",ischecked:false},
  {name:"dress",ischecked:false},
  {name:"hat",ischecked:false}])


      const handleChange=(i,e)=>{
          const c=catogories
          
          c.forEach(d => {
            d.ischecked=false
          });
          
          c[i].ischecked=true;
          
          setcatogories(c)

       setcategory(e)
      
      }

     const search=(e)=>{
            
           const options={
              keyword:e,
              page:page,
              category:category,
              price:price,
              limit:3
            }

            setkeyword(e)
            dispatch(getProduct(options))
 
     }
  
    useEffect(() => {

      const options={
        keyword:keyword,
        category:category,
        page:page,
        price:price,
        limit:3
      
      }


      dispatch(getProduct(options))

    }, [dispatch,category,page])

    useEffect(() => {

      setTimeout(() => {
        const options={
          keyword:keyword,
          category:category,
          price:price,
          limit:3
        }
  
  
        dispatch(getProduct(options))
      }, 500);

    }, [price])
     
     return (
        <div>
            <Header search={search}/>
            {
              product.load?<div className="text-center">
                             <h2>loading...</h2>
                           </div>:<> <div className="d-flex">
              <div className="category ml-3 text-center pt-2 col-2" >
              <h6>categories</h6>
               <div className="form-check text-left ml-3">
                  
                  {
                    catogories.map((c,i)=>{

                           return<> <label className="form-check-label">
                               <input type="checkbox" className="form-check-input" name="categories" checked={c.ischecked}  value={c.name}
                                onChange={(e)=>handleChange(i,e.target.value)} />
                                    {c.name===""?"all":c.name}
                             </label>
                            <br></br></>

                    })
                  }

          
                
               </div>
               <form>
                      <div className="form-group mt-3">
                            <label for="formControlRange"><h6>price( DA )</h6></label>
                               <input type="range" className="form-control-range" min={product.maxPrice} value={price} max={product.minPrice} onChange={(e)=>
                                 setprice(e.target.value)
                            } id="formControlRange"/>
                               <div className="d-flex justify-content-between">
                                 <small> {product.maxPrice}</small>
                                 <small className="text-danger"> <b>{price===0?"":"price<="+price}</b> </small>
                                 <small>{product.minPrice}</small>
                               </div>
                       </div>
                  </form>
              </div>
              <div>
              <h4 className="mb-4 ml-2  " style={{textTransform:"capitalize"}}>the latest products</h4>
              <div className="row mb-5 vw">
                {
                    product.product.map(p=> <Product key={p._id} id={p._id} img={p.image[0].url} name={p.name} price={p.price} moy_rating={p.moy_rating}/> )
                }
                
               
              </div>
              <MPagination activePage={page} count={product.count}   pageit={pageit}/>

              </div>
           </div>
           </>
            }
        </div>
    )
}
