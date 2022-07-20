import React, {useEffect, useState} from 'react'
import './Home.css'
import maxOsLogo from "../assets/brands/macOs.png"
import asusLogo from "../assets/brands/asus.jpg"
import dellLogo from "../assets/brands/dell.jpg"
import hpLogo from "../assets/brands/hp.png"
import msiLogo from "../assets/brands/MSI.png"
import samsungLogo from "../assets/brands/samsung.png"
import levonoLogo from "../assets/brands/lenovo.png"
import lgLogo from"../assets/brands/lg.png"         
import MacOSM1Background from "../assets/attachmentBackground/MacOSM1.jpg"  
import { getFeaturedProducts, getLatestProducts } from '../apis/productAPIs'
import {Link} from 'react-router-dom'
           
                
    
export default function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [latestProducts, setLatestProducts] = useState([])
    
    
    useEffect(() => {
        const getFeatureProductsData = async () => {
            const response = await getFeaturedProducts();
            if(response && response.data.featuredProduct.length > 0){
                setFeaturedProducts(response.data.featuredProduct);
            }
        }

        const getLatestProductsData = async () => {
            const response = await getLatestProducts();
            if(response && response.data.latestProduct.length > 0){
                setLatestProducts(response.data.latestProduct);
            }
        }
        getFeatureProductsData();
        getLatestProductsData();
    }, [])

    console.log(featuredProducts)
    
  return (
    // <!-- Banner -->
    <div>
        <div className="hero-image" id="bannerHomePage">
            <div className="hero-text">
                <h4>Welcome to</h4>
                <h2>AICT Store</h2>
                <a href="#feature-section" className="button">Explore now</a>
            </div>
        </div>

        {/* <!-- Brands --> */}
        <div className="brands">
            <div className="logo-container">
                <h2 className="title">Brands</h2>
                <div className="row">
                    <div className="col-4" id="categories">
                        <img className="brand" src={maxOsLogo}/>
                    </div>
                    <div className="col-4" id="categories">
                        <img className="brand" src={asusLogo}/>
                    </div>
                    <div className="col-4" id="categories">
                        <img className="brand" src={dellLogo}/>
                    </div>
                    <div className="col-4" id="categories">
                        <img className="brand" src={hpLogo}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4" id="categories">
                        <img className="brand" src={msiLogo}/>
                    </div>
                    <div className="col-4" id="categories">
                        <img className="brand" src={samsungLogo} />
                    </div>
                    <div className="col-4" id="categories">
                        <img className="brand" src={levonoLogo}/>
                    </div>
                    <div className="col-4" id="categories">
                        <img className="brand" src={lgLogo}/>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- Offer --> */}
        <div className="hero-image_M1_Pro" style={{ marginBottom: '70px'}}>
            <div className="hero-text">
                <h4 style={{color: "#fff"}}>Exclusively Available on Icy Tea Store</h4>
                <h2 style={{margin: "20px 0"}}>Macbook M1 Pro</h2>
                <p style={{color: "#fff"}}>
                    M1 chip - The first gen chip made by MacOS.
                    <br/>
                    <br/>
                    Retina 13.3 inches Resolution 2560 x  1600 
                    <br/>
                    <br/>
                    RAM 16GB - Really strong for all developers
                </p>
            </div>
        </div>

       {/* { <!-- Products -->} */}
        <div className="small-container">
            {/* <!-- Featured products --> */}
            <h2 className="title" id="feature-section">Featured Products</h2>
            <div className="row">
                {featuredProducts.map((item, index) => (
                    <div key={index} className="col-3" id="featuredProducts">
                        <Link to={`/products/view/${item.id}`} >
                            <img src={item.image} />
                        </Link>
                    <h4>{item.name}</h4>
                    <p>${item.price}</p>
                </div>
                ))}
            </div>

            {/* <!-- Latest products --> */}
            <h2 className="title">Latest Products</h2>
            <div className="row">
                {latestProducts.map((item, index) => (
                    <div key={index} className="col-4" id="latestProducts">
                        <Link to={`/products/view/${item.id}`}>
                            <img src={item.image} />
                        </Link>
                        <h4>{item.name}</h4>
                        <p>${item.price}</p>
                    </div>
                ))}
            </div>
    
        </div>

    </div>

  )
}
