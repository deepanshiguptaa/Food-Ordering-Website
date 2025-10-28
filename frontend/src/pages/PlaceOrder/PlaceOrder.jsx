import React, { useContext,useState } from 'react'
import { StoreContext } from '../../context/StoreContext';
import './PlaceOrder.css'
import { Last } from 'react-bootstrap/esm/PageItem';
import getTotalCartAmount from '../../context/StoreContext.jsx';
import axios from 'axios';
const PlaceOrder = () => {
    const {getTotalCartAmount,token,food_list,cartItems,url}= useContext(StoreContext);
    const[data,setData] = useState({
        firstName:"",
        LastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
    })
    const onChangeHandler = (event) => {
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value})) 
    }

    const placeOrder=async(event)=>{
        event.preventDefault();
        let orderItems=[];
        food_list.map((item)=>{
            if(cartItems[item._id]>0){
                let iteminfo={...item};
                iteminfo["quantity"]=cartItems[item._id];
                orderItems.push(iteminfo);
            } 
        })
        let orderData={
            address:data,
            items:orderItems,
            amount:getTotalCartAmount()+2,
        }
        let response = await axios.post(url+"/api/orders/place",orderData,{headers:{token}});
        if(response.data.success){
            const {Session_url}=response.data;
            window.location.replace(Session_url)
        }
        else{
            alert("Error");
        }
    }
    return (
    <form onSubmit={placeOrder} className='place-order'>
        <div className='place-order-left'>
            <p className='title'>Delivery Information</p>
            <div className='multi-fields'>
                <input  required name='firstName' onChange={onChangeHandler} value={data.firstname} type='text' placeholder='First Name'/>
                <input  required name='lastName' onChange={onChangeHandler} value={data.lastname} type='text' placeholder='Last Name'/>
            </div>
            <input required  name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email'/>
            <input required  name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street'/>
            <div className='multi-fields'>
                <input required  name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City'/>
                <input required  name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State'/>
            </div>
            <div className='multi-fields'>
                <input required  name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zipcode'/>
                <input  required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country'/>
            </div>
            <input required  name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone'/>
        </div>
        <div className='place-order-right'>
        <div className='cart-total'>
            <h2>cart Totals</h2>
            <div>
            <div className='cart-total-details'>
                    <p>subutotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div> 
                <hr/>
                <div className='cart-total-details'>
                    <p>delivery fee</p>
                    <p>${getTotalCartAmount()}===0?0:2</p>
                </div>
                <hr/>
                <div className='cart-total-details '>
                    <b>Total</b>
                    <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
                </div>
            </div>
            <button type='submit'>proceed to pay</button>
        </div>
        </div>
    </form>
    
  )
}

export default PlaceOrder
