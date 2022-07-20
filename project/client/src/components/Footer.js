import React from 'react'
import './Footer.css'
import appStoreLogo from '../assets/brands/app-store.png'
import playStore from '../assets/brands/play-store.png'
import logo from '../assets/icons/logo.jpg'

export default function Footer() {
  return (
    <div className="footer">
        <div className="container">
            <div className="row">
                <div className="footer-col-1">
                    <h3>Download Our App</h3>
                    <p>Download App for Android and Ios</p>
                    <div className="app-logo">
                        <img src={appStoreLogo} />
                        <img src={playStore}/>
                    </div>
                </div>
                <div className="footer-col-2">
                    <img src={logo} style={{width: '4rem', height: '4rem', borderRadius: '50%', objectFit:'cover'}}/>
                    <p>Welcomes You To The Shop</p>
                </div>
                <div className="footer-col-3">
                    <h3>Follow us</h3>
                    <ul>
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>Github</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <p style={{textAlign: "center"}}>@Copyright 2021 - Minh Do</p>
        </div>
    </div>
  )
}
