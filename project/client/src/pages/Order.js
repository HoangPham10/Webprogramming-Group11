import React, {useEffect, useState} from 'react'
import './Order.css'
import { useSelector, useDispatch } from 'react-redux'
import { getShipments } from '../apis/shipmentAPIs';
import { getPayments } from '../apis/paymentAPIs';
import {useNavigate, Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { createTransaction } from '../apis/userAPIs';
import { Types } from '../redux/Type';

export default function Order() {
    const {username, address, phone, cart, token} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [shipments, setShipments] = useState([])
    const [payments, setPayments] = useState([])
    const [shipmentMethod, setShipmentMethod] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
     
    const totalPrice = cart.reduce((total, num) => total + num.price * num.quantity, 0)
    const [totalBill, setTotalBill] = useState(totalPrice)


    useEffect(() => {
        const getShipmentsData = async() => {
            try{
                const shipmentResponse = await getShipments();
                const paymentResponse = await getPayments();
                setShipments(shipmentResponse.data.shipments);
                setPayments(paymentResponse.data.payments);
            }catch(err){
                alert(err)
            }
        } 
        getShipmentsData();
    }, [])

    const shipmentMethodHandler = (e) => {
        setShipmentMethod(e.target.value);
        setTotalBill(totalPrice + shipments.find(item => item.id.toString() === e.target.value).fee)
    }

    const paymentChangeHandler = (e) => {
        setPaymentMethod(e.target.value);
    }

    const onSubmitHandler = async() => {
        const payload = {
            transaction_id: uuidv4(),
            username: username,
            cart: cart,
            payment_id: paymentMethod,
            shipment_id: shipmentMethod
        }
        const response = await createTransaction(token, payload);
        if(response.data.msg){
            alert(response.data.msg)
        }
        if(response.status === 200){
            dispatch({type: Types.ADD_TO_CART, payload: []})
            navigate('/orders/thankyou');
        }
    }
    
  return (
    <div>
        {/* <form action="<?php echo BASE_PATH ?>/orders/confirmPurchase" method="POST" onsubmit="return validatePurchase()"> */}
            <div className="small-container order-page">
                <div className="row" style={{marginBottom: "50px"}}>
                    <h2>Confirm order</h2>
                </div>
                <div className="row" style={{alignItems: "stretch"}}>
                    <div className="col-2">
                        <table>
                            <tr>
                                <th>#</th>
                                <th>Products</th>
                                <th>Quantity</th>
                            </tr>
                            {
                                cart.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>
                                            <div className="order-info">
                                                <img src={item.image} />
                                                <div>
                                                    <p>{item.name}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.quantity}</td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td style={{fontSize: "22px", fontWeight:600}}>Total</td>
                                <td style={{fontSize: '22px', fontWeight:600, color: "#ff523b"}}>
                                    ${totalPrice}
                                    <input type="hidden" name="user_id" value={username} />
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div className="col-2" style={{padding: '0 60px', minWidth: '200px'}}>
                        <div className="method-box">
                            <h4>Shipment Method</h4>
                            {
                                shipments.map((item, index) => (
                                    <div className="radio-row" key={index}>
                                        <input type="radio" name="shipment-method" onChange={(e) => {shipmentMethodHandler(e)}} id={item.id} value={item.id} />
                                        <label for={item.id}>{item.method}: {item.fee}</label>
                                </div>
                                ))
                            }
                        </div>

                        <div className="method-box">
                            <h4>Payment Method</h4>
                            {
                                payments.map((item, index) => (
                                    <div className="radio-row" key={index+10}>
                                        <input type="radio" name="payment-method" onChange={(e) => {paymentChangeHandler(e)}} id={item.id+shipments.length} value={item.id} />
                                        <label for={item.id+shipments.length}>{item.method}</label>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="method-box">
                            <h4>Address</h4>
                            <input required type="text" name="address" value={address} style={{width: '100%'}} />
                        </div>

                        <div className="method-box">
                            <h4>Phone</h4>
                            <input required type="text" name="phone" value={phone} style={{width: '100%'}} />
                        </div>

                        <div className="row" id="bill">
                            <h1 style={{color: '#ff523b', fontWeight: 600}}>
                                ${totalBill}
                            </h1>
                        </div>

                        <div class="method-box" style={{marginTop:'20px'}}>
                            <button onClick={onSubmitHandler} disabled={shipmentMethod === '' || paymentMethod ==='' ? true : false} className="button" >Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        {/* </form> */}
    </div>
  )
}






export const OrderThankYou = () => {
    return( 
        <div className="small-container thank-you-page">
            <div className="row">
                <h2>Thank you for your purchase</h2>
            </div>
            <div className="row">
                <Link to="/" className="button">Back to Home Page</Link>
            </div>
        </div>
    )
}