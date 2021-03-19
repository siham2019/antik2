import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { changePassword, ifAuthenticate } from '../../redux/actions/user'
import { Header } from '../Header'

export const Password = () => {
    
    const [password, setpassword] = useState("")
    const [newpass, setnewpass] = useState("")

    const dispatch = useDispatch()

   const user = useSelector(state => state.user)
    
    const submit=(e)=>{
       
        e.preventDefault()
         dispatch(changePassword(password,newpass))
    }

   if(user.isa===false || user.success) return <Redirect to="/"/>
  
    return (
        <div >
            <Header/>
            <form className="form-group col-6 mx-auto mb-3" onSubmit={submit}>
            <h3 className="text-center">CHANGE YOUR PASSWORD</h3>
            {user.message && <div className="alert alert-danger">{user.message}</div>}
                <input type="text" className="form-control my-3" value={password} onChange={(e)=>setpassword(e.target.value)}
                 placeholder="enter your old password"/>
            
                <input type="text" className="form-control my-3" value={newpass} onChange={(e)=>setnewpass(e.target.value)}
                 placeholder="enter new password"/>
               <button type="submit"  className="btn btn-danger container">submit</button>
            </form>
        </div>
    )
}
