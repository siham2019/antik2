import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ifAuthenticate, login } from '../../redux/actions/user'
import { Header } from '../Header'
import { Redirect } from 'react-router'

export const Login = () => {
    
    
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")

   const dispatch = useDispatch()
   const user = useSelector(state => state.user)

   const submit=(e)=>{

       e.preventDefault()

       dispatch(login({email:email,password:password}))
      

   }
useEffect(() => {
   dispatch(ifAuthenticate())
}, [dispatch])

   if(user.isa || user.success) return <Redirect to="/"/>
    return (
        <div>
            <Header/>
          
          <div className="col-6 mx-auto mb-3">
          <h3 className="text-center">SIGN IN</h3>

          {user.err && <div className="alert alert-danger">{user.err}</div>}
          
          <form className="form fox p-4 mt-4" onSubmit={submit}>
     
                 <div className="input-group my-3">
                      <div className="input-group-prepend">
                         <div className="input-group-text bg-light">@</div>
                        </div>
                 <input type="email" className="form-control  " value={email} onChange={(e)=>setemail(e.target.value)} name="email"  placeholder="enter email" />
                 </div>

                 <div className="input-group my-3">
                      <div className="input-group-prepend">
                         <div className="input-group-text bg-light"><i className="fas fa-key"></i></div>
                        </div>
                 <input type="password" className="form-control" name="password" value={password} onChange={(e)=>setpassword(e.target.value)}  placeholder="enter your password" />
                 </div>
                <button type="submit"  className="container btn btn-danger mb-3">submit</button>
                <p>you don't have account <a href="/register">register</a></p>
               </form>
          </div>
        </div>
    )
}
