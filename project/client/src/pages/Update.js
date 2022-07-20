import React,{useState} from 'react'
import './Update.css'
import macOs from '../assets/attachmentBackground/macOs.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { updateAPI } from '../apis/userAPIs'
import { Types } from '../redux/Type'


export default function Update() {
    const { 
        username,
        email,
        address,
        phone,
        name,
        token
    } = useSelector(state => state.user)
    const [account, setAccount] = useState({
        username: username,
        email: email,
        password: '',
        address: address,
        phone: phone,
        name: name
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const inputChangeHandler = e => {
        const {name , value} = e.target
        setAccount({...account,
            [name] : value
        })
    }
    const onSubmitHandler = async() => {
        const response = await updateAPI(token, account);
        if(response.data && response.data.msg ){
            alert(response.data.msg)
        }
        if(response.data && response.data.msg === 'Update Successfully'){
            dispatch({type: Types.UPDATE_SUCCESSFULL, payload: response.data});
            navigate('/')
        }
    }
  return (
    <div className="update-page">
        <div className="container">
            <div className="row">
                <div className="col-2">
                    <img className='computerAppleImg' style={{width: "90%",opacity: "0.3",height: '100%'}} src={macOs} />
                </div>
                <div className="col-2">
                    <div className="form-container" style={{height: "550px"}}>
                        <div className="form-button">
                            <h3>Your information</h3>
                        </div>
                            <div className="input-box">
                                <input required type="password" value={account.password} onChange={inputChangeHandler} id="password" name="password" placeholder="Password"/>
                            </div>
                            <div className="input-box">
                                <input required type="text" value={account.name} onChange={inputChangeHandler} id="name" name="name"  placeholder="Name"/>
                            </div>
                            <div className="input-box">
                                <input required type="text"  value={account.address} onChange={inputChangeHandler} id="address" name="address"  placeholder="Address"/>
                            </div>
                            <div className="input-box">
                                <input required type="tel"  value={account.phone} onChange={inputChangeHandler} id="phone" name="phone"  placeholder="Phone"/>
                            </div>
                            <div className="input-box">
                                <button className='button' onClick={() => {onSubmitHandler()}}>Save Changes</button> 
                            </div>
                            <div className="input-box">
                                <Link to="/orders/viewall">Order History</Link>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
