import React, { useContext } from 'react'
import {NavLink, useNavigate} from "react-router-dom";
import { GrCart } from "react-icons/gr";
import { HashLink } from 'react-router-hash-link'
import { StoreContext } from '../context/StoreContext';
import { IoPersonSharp } from "react-icons/io5";
import { PiPackageLight } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";


const Navbar = ({setShowLogin}) => {
  const navigate = useNavigate()
  const {token, setToken} = useContext(StoreContext)

  const logout =() =>{
    localStorage.removeItem('token');
    setToken("");
    navigate('/');
  }


  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <NavLink className="logo" to="/">Yummy</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <HashLink className="nav-link active" aria-current="page" to="/">Home</HashLink>
                </li>
                <li className="nav-item">
                <HashLink className="nav-link active" aria-current="page" to="/menu">Menu</HashLink>
                </li>
                <li className="nav-item">
                <HashLink className="nav-link active" aria-current="page" to="#chefs">Chef</HashLink>
                </li>
                <li className="nav-item">
                <HashLink className="nav-link active" aria-current="page" to="#gallery">Gallery</HashLink>
                </li>
                <li className="nav-item">
                <HashLink className="nav-link active" aria-current="page" to="#testimonials">Testimonials</HashLink>
                </li>
                <li className="nav-item">
                <HashLink className="nav-link active" aria-current="page" to="/ContactUs">Contact Us</HashLink>
                </li>
            </ul>
            <div className='cart-icon'>
                <GrCart onClick= {()=>navigate('cart')} className='cart-icon'/>&nbsp;
            </div>
            {!token ?<div className='btn btn-signin' onClick={() => setShowLogin(true)}>
              Sign In
            </div>:
            <div className='navbar-profile'>
              <IoPersonSharp alt="" size={28} className='profile-icon' />
              <ul className="nav-profile-dropdown">
                <li><PiPackageLight className='dropdown-icons' color="#fa5c1c" alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logout}><IoIosLogOut className='dropdown-icons' color="#fa5c1c" alt=""/><p>Logout</p></li>
              </ul>
            </div>}
            
            </div>
        </div>
        </nav>
    </div>
  )
}

export default Navbar