import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../../../../redux/actions/productAction'
import { Header } from '../../../Header'
import { Redirect } from 'react-router'

export const CreateP = () => {
    const catogories=[
     
        {name:"beauty"},
        {name: "health"},
        {name:"shoes"},
        {name:"skirt"},
        {name:"pant"},
        {name:"accessory"},
        {name:"sport"},
        {name:"dress"},
        {name:"hat"}
    ]
    const user = useSelector(state => state.user)

    const [name, setname] = useState("")
    const [price, setprice] = useState(1)
    const [description, setdescription] = useState("")
    const [stock, setstock] = useState(0)
    const [file, setfile] = useState()

    const dispatch = useDispatch()
    const p = useSelector(state => state.productReducer)

    const submit=async(e)=>{
       

        e.preventDefault()
        let res,b=[]

        if(file){
            const formData = new FormData();

            formData.append('file', file.file);
            formData.append("api_key",'592926298862529');
            formData.append('upload_preset', "qdigo43z");
            

                for (let i = 0; i <   file.file.length; i++) {
                    formData.set('file',file.file[i]);

                    res=await axios.post("https://api.cloudinary.com/v1_1/dzdwsvodc/image/upload/",formData)   
                    var str =res.data.secure_url;
                    var les = str.split("upload");
                 
        
        
                    b.push({public_id:res.data.public_id,
                        url: les[0]+"upload/w_700"+les[1]})
                    
                }
                
                let x = document.getElementById("select").selectedIndex;
              const category=document.getElementsByTagName("option")[x].value
        
          const product={
              name:name,
              price:price,
              stock:stock,
              description:description,
              category:category,
              image:b
          }
         dispatch(createProduct(product))
        }
        




    }




    const changeFile=(event)=>{
        
        const imageFile = document.querySelector('input[type="file"]')
        const files = imageFile.files
        
        let n=[...event.target.files]
        let f=[]

        n.map(e=>
               {
                   f.push(URL.createObjectURL(e))
               }
            )

         setfile({path:f,file:files})
   }
  
   if(user.isd===2|| user.isa===false) return <Redirect to="/" />
    return (
        <div>
            <Header/>
            <div className="container">
            <h4 className="mb-2">ADD PRODUCT</h4>
            {
             p.message && <div class="alert alert-success" role="alert">
                 {p.message}
             </div>
            }
              {
             p.err && <div class="alert alert-success" role="alert">
                 {p.err}
             </div>
            }
            <form className=" mx-5" onSubmit={submit}>
                  <div className="form-group">
                      <input type="text" className="form-control"  placeholder="enter the name of product" value={name} onChange={(e)=>setname(e.target.value)} required/>
                  </div>
                  <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">price</label>

                      <input type="number" className="form-control"  placeholder="enter the price of product" value={price} onChange={(e)=>setprice(e.target.value<1?1:e.target.value)} required/>
                  </div>
                  <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">stock</label>

                      <input type="number" className="form-control"  placeholder="enter the stock ( number ) of product" value={stock} onChange={(e)=>setstock(e.target.value<0?0:e.target.value)} required/>
                  </div>
                 <div className="form-group">
                          <label htmlFor="select">category</label>
                          <select className="form-control" id="select" required>
                                  {
                                        catogories.map((e,i)=><option key={i} value={e.name}>{e.name}</option>)    
                                  }     
   
                            </select>
                   </div>
                   <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">description</label>
                         <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={description} onChange={(e)=>setdescription(e.target.value)} required></textarea>
                  </div>
                  <div className="custom-file mb-4">

                           <input type="file" className="custom-file-input"
                                  id="customFile" onChange={changeFile} accept="image/x-png,image/jpeg" multiple="multiple" required/>
                            <label className="custom-file-label" htmlFor="customFile" >Choose product images</label>

                    </div>
                    <div className="d-flex border" style={{width:"100%"}}>
                    {file? file.path.map((e,i)=>{return<div key={i}  className="mr-2"><img src={e} alt="profile" className="mb-3 ml-2  border w-100 h-100"/></div>}):""}
                    </div>   
                       
                     <button type="submit" className="btn btn-dark container">Submit</button>
              </form>
              </div>
        </div>
    )
}
