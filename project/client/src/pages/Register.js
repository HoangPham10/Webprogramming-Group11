import React, {useState} from 'react'
import './Register.css'
import macOs from '../assets/attachmentBackground/macOs.jpg'
import { Link } from 'react-router-dom'
import { registerAPI } from '../apis/userAPIs';
import { Navigate } from 'react-router-dom';

export default function Register() {
    const [account, setAccount] = useState({
        username: '',
        password: '',
        name: '',
        email:'',
        address: '',
        phone: '',
    });

    const inputChangeHandler = e => {
        const {name , value} = e.target
        setAccount({...account,
            [name] : value
        })
    }
    const onSubmitHandler = async() => {
        const response = await registerAPI(account);
        if(response.data && response.data.msg ){
            alert(response.data.msg)
        }
        if(response.data.msg === 'Register Successfully'){
            setAccount({
                username: '',
                password: '',
                name: '',
                email:'',
                address: '',
                phone: '',
            });
        }
    
    }
  return (
    <div class="login-page">
        <div class="container">
            <div class="row">
                <div class="col-2">
                    <img className='computerAppleImg' style={{width: "90%",opacity: "0.3",height: '100%'}} src={macOs} />
                </div>
                <div class="col-2">
                    <div class="form-container" style={{height: "570px"}}>
                        <div class="form-button">
                            <span id="loginButtonRegister"><Link to="/users/login">Login</Link></span>
                            <span id="registerButton">Register</span>
                        </div>
                            <div class="input-box">
                                <h3>Welcome,</h3>
                            </div>
                            <div class="input-box">
                                <input required type="text" onChange={inputChangeHandler} id="username" value={account.username} name="username" placeholder="Username"/>
                            </div>
                            <div class="input-box">
                                <input required type="password" onChange={inputChangeHandler} id="password" value={account.password} name="password" placeholder="Password"/>
                            </div>
                            <div class="input-box">
                                <input required type="text" onChange={inputChangeHandler} id="name" value={account.name} name="name" placeholder="Name"/>
                            </div>
                            <div class="input-box">
                                <input required type="email" onChange={inputChangeHandler} id="email" value={account.email} name="email" placeholder="Email"/>
                            </div>
                            <div class="input-box">
                                <input required type="text" onChange={inputChangeHandler} id="address" value={account.address} name="address" placeholder="Address"/>
                            </div>
                            <div class="input-box">
                                <input required type="tel" onChange={inputChangeHandler} id="phone" value={account.phone} name="phone" placeholder="Phone"/>
                            </div>
                            <div class="input-box">
                                <button className='button' onClick={() => {onSubmitHandler()}}>Register</button>
                            </div>
                            <div class="input-box">
                                <Link to="/">Back to Home Page</Link>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
