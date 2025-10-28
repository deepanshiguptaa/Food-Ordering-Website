import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import { IoRemoveCircle } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate, Link } from 'react-router-dom';
import { LuIndianRupee } from "react-icons/lu";

const Cart = () => {
  const navigate = useNavigate()
  const{cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount,url} = useContext(StoreContext)
  return (
    <div className='container mt-5 cart'>
      <div>
        <table className='table table-striped table-dark table-hover table-bordered'>
          <thead>
            <tr>
              <th>Item</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {
              food_list.map((item,index)=>{
                if(cartItems[item._id]>0){
                  return(
                    <tr key={index}>
                      <td><img src={url+"/uploads/"+item.image} alt="" className='cart-img'/></td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{cartItems[item._id]}</td>
                      <td>{(item.price) * (cartItems[item._id])}</td>
                      <td><IoRemoveCircle className='delete-icon' onClick={()=>removeFromCart(item._id)}/></td>
                      <td><IoMdAddCircle className='add-icon' onClick={()=>addToCart(item._id)}/></td>
                    </tr>
                  )
                }
              })
            }
          </tbody>

        </table>
      </div>
      <div className='container'>
        <p className='fw-bold'> Amount: <LuIndianRupee/> {getTotalCartAmount()}</p>
        <div className='mt-3'>
          <button onClick={()=> navigate('order')} className='btn btn-danger'>Proceed to Checkout</button>
          <Link to="/cart/order" className="btn btn-success">
            Place Order
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Cart