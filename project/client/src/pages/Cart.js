import React from 'react'
import "./Cart.css"
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCartAPI, decreaseQty, removeProductToCart } from '../apis/userAPIs'
import { Types } from '../redux/Type'
import { getProduct } from '../apis/productAPIs'
export default function Cart() {
    const {cart, token, username } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const totalPrice = cart.reduce((total, num) => total + num.price * num.quantity, 0)
    const addToCart = async(id) => {
        const payload =  await getProduct(id)
        const response = await addToCartAPI(token, {username: username, product: payload.data.product})
        if(response.data.msg){
            alert(response.data.msg)
            return;
        }
        const updatedCart = response.data.cart.map(item => ({image: item.image, price: item.price,name:item.name, product_id: item.product_id, quantity: item.quantity}))
        dispatch({type: Types.ADD_TO_CART, payload : updatedCart})
    }

    const DecreaseCart = async(id) => {
        const payload =  await getProduct(id)
        const response = await decreaseQty(token, {username: username, product: {...payload.data.product, quantity: cart.find(item => item.product_id === id).quantity}})
        const updatedCart = response.data.cart.map(item => ({image: item.image, price: item.price,name:item.name, product_id: item.product_id, quantity: item.quantity}))
        dispatch({type: Types.ADD_TO_CART, payload : updatedCart})
    }

    const RemoveHandler = async(id) => {
        const payload =  await getProduct(id)
        const response = await removeProductToCart(token, {username: username, product:{...payload.data.product, quantity: cart.find(item => item.product_id === id).quantity}})
        const updatedCart = response.data.cart.map(item => ({image: item.image, price: item.price,name:item.name, product_id: item.product_id, quantity: item.quantity}))
        dispatch({type: Types.ADD_TO_CART, payload : updatedCart})
    }

  return (
    // <!-- Display cart table -->
    <>
    { cart.length > 0 ? (
        <div className="small-container cart-page">
            <div className="row row-2">
                <h2>Your cart</h2>
            </div>
            <table>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th></th>
                </tr>
                {
                    cart.map((item, index) => (
                        <tr>
                            <td>
                                <div className="cart-info">
                                    <img src={item.image}/>
                                    <div>
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                            </td>
                            <td>{item.price}</td>
                            <td>
                                <button type="button" onClick={() => {DecreaseCart(item.product_id)}}>-</button>
                                {item.quantity}
                                <button type="button" onClick={() => {addToCart(item.product_id)}} >+</button>
                            </td>
                            <td>
                                {item.quantity*item.price}
                            </td>
                            <td><button className='removebutton' onClick={() => {RemoveHandler(item.product_id)}} style={{marginBottom: '0px !important'}}>Remove</button></td>
                        </tr>
                    ))
                }
            </table>

            <div className="row" style={{marginTop: "40px"}}>
                <h2>Total</h2>
                <p style={{marginLeft: "20px", color: '#ff523b', textTransform: 'uppercase', fontSize: '24px', fontWeight: 700, transition: 'all .3s ease 0s'}}>
                    ${totalPrice}
                </p>
                <Link to="/orders/index" className="button" style={{marginLeft: "auto"}}>Buy</Link>
            </div>
        </div>
    ):(
        <div className="small-container cart-page">
            <div className="row row-2">
                <h2>Your cart</h2>
            </div>
            <h4 style={{color: "red"}}>Cart Empty</h4>
        </div>
    )
    }
    </>
  )
}
