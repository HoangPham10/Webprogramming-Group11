import React, {useState} from 'react'
import { Navigate, Link } from 'react-router-dom'
import macOs from '../assets/attachmentBackground/macOs.jpg'
import './Login.css'
import { loginAPI } from '../apis/userAPIs'
import { useDispatch } from 'react-redux'
import { Types } from '../redux/Type'
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [account, setAccount] = useState({
        username: '',
        password: '',
    })
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const inputChangeHandler = e => {
        const {name , value} = e.target
        setAccount({...account,
            [name] : value
        })
    }
    const onSubmitHandler = async() => {
        const response = await loginAPI(account);
        if(response.data && response.data.msg ){
            alert(response.data.msg)
        }else{
            dispatch({type: Types.LOGIN_SUCCESSFULL, payload: response.data});
            navigate('/')
        }
    }

  return (
    
    <div className="login-page">
        <div className="container">
            <div className="row">
                <div className="col-2">
                    <img className='computerAppleImg' style={{width: "90%",opacity: "0.3",height: '100%'}} src={macOs}  />
                </div>
                <div className="col-2">
                    <div className="form-container" style={{height: "350px"}}>
                        <div className="form-button">
                            <span id="loginButton">Login</span>
                            <span><Link to="/users/register" id="registerButtonLogin">Register</Link></span>
                        </div>
                            <div className="form-row">
                                <h3>Welcome back,</h3>
                            </div>
                            <div className="form-row">
                                <input required value={account.username} onChange={inputChangeHandler} type="text" name="username" placeholder="Username"/>
                            </div>
                            <div className="form-row">
                                <input required type="password" value={account.password} onChange={inputChangeHandler}  name="password" placeholder="Password"/>
                            </div>
                            <div className="form-row">
                                <button className='button' onClick={() => {onSubmitHandler()}}>Login</button>
                            </div>
                            <div className="form-row" style={{marginTop: "20px"}}>
                                <Link to="/">Back to Home Page</Link>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
