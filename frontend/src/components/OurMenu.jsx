import React from 'react'
import {menu_list} from '../assets/assets.jsx'
import { Navigate } from 'react-router-dom'

const OurMenu = ({category,setCategory}) => {
  return (
    <div className='container our-menu' id='ourMenu'>
        <br /><br />
        <h5>Our Menu</h5>
        <h2>Check our <span>Yummy Menu</span></h2>
        <div className='menu-list'>
            {
                menu_list.map((item,index)=>{
                    return(
                        <div className='menu-list-item' key={index} onClick={()=> setCategory(item.menu_name)}>
                            <img src={item.menu_image} alt="" className={`img-fluid menu-img-Food ${category === item.menu_name ? 'active' : ''}`}key={index} onClick={()=>setCategory(item.menu_name)}  />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })
            }
        </div>
        {/* <div className='d-flex justify-content-center my-3'>
            <button onClick={()=>setCategory("All")} className='btn btn-success show_all'>Show All</button>
        </div> */}

        <div className='d-flex justify-content-center my-3'>
            <button onClick={()=>Navigate('/menu')} className='btn btn-success show_all'>View More </button>
        </div>
         
    </div>
  )
}

export default OurMenu