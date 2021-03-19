import React, { useState } from 'react'
import { Header } from '../Header'
import { register } from '../../redux/actions/user'
import { useDispatch, useSelector } from 'react-redux'

export const Register = () => {
   
    const [name, setname] = useState("")
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")
    
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
   const submit=(e)=>{

      e.preventDefault()
      dispatch(register({email:email,password:password,name:name}))
  
   }
    
    return (
        <div>
         <Header/>
           
           <div className="col-6 mx-auto mb-3">
                
                <h3 className="text-center">REGISTER</h3>
                {user.err && <div className="alert alert-danger">{user.err}</div>}
                {user.success && <div className="alert alert-info">you registered!!</div>}
               <form className="form fox p-4 mt-4" onSubmit={submit}>
                  <div className="input-group">
                      <div className="input-group-prepend">
                         <div className="input-group-text bg-light"><i className="far fa-user-circle	"></i></div>
                        </div>
                      <input type="text" className="form-control" name="name" value={name} onChange={(e)=>setname(e.target.value)} placeholder="type your full name" required/>
                 </div>
                 
                 <div className="input-group my-3">
                      <div className="input-group-prepend">
                         <div className="input-group-text bg-light">@</div>
                        </div>
                 <input type="email" className="form-control  " value={email} onChange={(e)=>setemail(e.target.value)} name="email"  placeholder="enter email" required/>
                 </div>

                 <div className="input-group my-3">
                      <div className="input-group-prepend">
                         <div className="input-group-text bg-light"><i className="fas fa-key"></i></div>
                        </div>
                 <input type="password" className="form-control" name="password" value={password} onChange={(e)=>setpassword(e.target.value)}  placeholder="password must be at least 8 characters" required/>
                 </div>
                <button type="submit"  className="container btn btn-danger mb-3">submit</button>
                <p>you already have account <a href="/login">sign in</a></p>
               </form>
           </div>
        </div>
    )
}
