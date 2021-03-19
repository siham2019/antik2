import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { getProfile, signout } from '../../redux/actions/user'
import { Header } from '../Header'

export const Profile = () => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const signOut=()=>{
        
      dispatch(signout())
      window.location.reload()
  }
    
  useEffect(() => {

       dispatch(getProfile())
       
    }, [dispatch]);
    if(user.isa===false) return <Redirect to="/"/>
    return (
        <div>
           <Header/>
             <div className="container mb-5">
                
               {
                   user.success && <>
                   <div className="d-flex justify-content-between">
                      <h1>my profile</h1>
                      <button className="btn btn-outline-light text-dark" type="button" onClick={signOut}> <i className="fas fa-door-open"></i> sign out </button>
                    </div>
                 <hr/>
                <div className="row">
                <div className="col-4">
                     <div className="img">
                         <a className="btn btn-danger text-light d-block mb-3" href="/profile/edit">edit profile</a>
                         <img src={user.user.image.url} alt="profile"/>
                      </div>
                 </div>
                 <div className="col-8 pl-5 py-4">
                   <div className="d-flex ">
                     <h5 className="text-secondary mr-3">Full Name </h5>
                      <p>{user.user.name}</p>
                   </div>
                
                   <div className="d-flex">
                      <h5 className="text-secondary mr-3">Email  </h5>
                      <p>{user.user.email}</p>
                  </div>
                
                     <a  className="btn btn-dark text-light" href="/password/change">change password</a>
                 </div>
               
                </div>
                   
                   </>
               }

             </div>
              
        </div>
    )
}
