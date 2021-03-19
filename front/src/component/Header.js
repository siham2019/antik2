import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "../App.css"
import { ifAuthenticate } from '../redux/actions/user'
import { Search } from './product/search'
export const Header = (props) => {


    const dispatch = useDispatch()
    const user = useSelector(state => state.user)


    useEffect(() => {
         dispatch(ifAuthenticate())
     }, [dispatch])
     return (
        <div>   
             <nav className="navbar shadow-lg navbar-expand-sm navbar-light p-2 bg-light mb-5">
                  <a className="navbar-brand ml-3" href="/">ANTIK</a>
                  <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                       aria-expanded="false" aria-label="Toggle navigation">
                           <span className="navbar-toggler-icon"></span>
                  </button>
            <div className="ml-auto d-flex cv">
               
               <Search search={props.search}/>

        <div className=" collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav  mt-2 mt-lg-0 dd ">
                <li className="nav-item text-center">
                    <a className="nav-link" href="/cart"> <i className="fas fa-shopping-bag"></i> cart </a>
                </li>
                 {
                     user.isa &&   <><li className="nav-item text-center">
                     <a className="nav-link" href="/profile"> <i className="far fa-sun	"></i> setting </a>
                 </li>
                 <li className="nav-item text-center">
                     <a className="nav-link" href="/me/order">  my orders </a>
                 </li>
                 </>
                 }
                   {
                     user.isd==1 &&   <><li className="nav-item text-center">
                     <a className="nav-link" href="/admin/products"> products </a>
                 </li>
                 <li className="nav-item text-center">
                     <a className="nav-link" href="/admin/orders">   orders </a>
                 </li>
                 </>
                 }
                {!user.isa && <><li className="nav-item">
                    <a className="nav-link" href="/login"><i className="far fa-user-circle"></i> sign in </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/register"><i className="fas fa-user-plus"></i> sign up </a>
                </li></>}
              
            </ul>
         
        </div>
            </div>
    </nav>
        </div>
    )
}
