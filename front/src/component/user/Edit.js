import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../Header'
import { Redirect } from "react-router-dom";
import { updateProfile } from '../../redux/actions/user';

export const Edit = () => {
    const [email, setemail] = useState("");
    const [name, setname] = useState("")
    const [file, setfile] = useState()
     const dispatch = useDispatch()
       const user = useSelector(state => state.user)

    const submit=async(e)=>{
          
        e.preventDefault()
        if(file){
            const formData = new FormData();

            formData.append('file', file.file);
            formData.append("api_key",'592926298862529');
            formData.append('upload_preset', "qdigo43z");
          
            const res=await axios.post("https://api.cloudinary.com/v1_1/dzdwsvodc/image/upload",formData)   
          
            dispatch(updateProfile({
                email:email,
                name:name,
                public_id:res.data.public_id,
                url:res.data.secure_url
            }))
        }
    
    }
const changeFile=(event)=>{
        
         const imageFile = document.querySelector('input[type="file"]')
         const files = imageFile.files 
     
           setfile({path:URL.createObjectURL(event.target.files[0]),file:files[0]})

}
    if(user.success) return <Redirect to="/"/>
    if(user.isa===false) return <Redirect to="/login"/>
   return (
        <div>          
             <Header/>
            <div className="container text-center">
            {user.err && <div className="alert alert-danger">{user.err}</div>}
                <h3>EDIT PROFILE</h3>
                <form onSubmit={submit}>
                      <div className="form-group">
                          
                          <input type="email" className="form-control"placeholder="Enter email" 
                          value={email} onChange={(e)=>setemail(e.target.value)} required/>

                       </div>
                       <div className="form-group">

                             <input type="text" className="form-control"  
                             value={name} onChange={(e)=>setname(e.target.value)}
                             placeholder="Enter full name" required/>

                       </div>
                        <div className="custom-file mb-4">

                                     <input type="file" className="custom-file-input"
                                      id="customFile" onChange={changeFile} accept="image/x-png,image/jpeg" required/>
                                   <label className="custom-file-label" for="customFile" >Choose profile image</label>
                        
                        </div>
                        {file?<img src={file.path} alt="profile" className="mb-3"/>:""}
                        <button type="submit" className="btn btn-dark container">Submit</button>
                   </form>
            </div>
            
        </div>
    )
}
