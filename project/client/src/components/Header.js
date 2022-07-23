import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import { BASE_PATH } from '../config/config';
import logo from '../assets/icons/logo.jpg'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import CartIcon from "../assets/icons/cart.png"
import MenuIcon from "../assets/icons/menu.png"
import { Types } from '../redux/Type';
import { logoutAPI } from '../apis/userAPIs';
import { googleLogout } from '@react-oauth/google';



export default function Header() {
    const {isLogged, role} = useSelector(state => state.user);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();


    const logOut = async() => {
        await logoutAPI();
        googleLogout();
        dispatch({type: Types.LOGOUT})
    }
    // const searchWrapper = document.querySelector(".search-input");
    // const inputBox = searchWrapper.querySelector("input");
    // const suggBox = searchWrapper.querySelector(".autocom-box");
    // const icon = searchWrapper.querySelector(".icon");
    // let linkTag = searchWrapper.querySelector("a");
    // let webLink;


    // const showButton = () => {
    //     const loginButton = document.getElementById('login');
    //     const logoutButton = document.getElementById('logout');
    //     const adminButton = document.getElementById('admin');
    //     if (localStorage.getItem("isLoggedIn") === 'user') {
    //         loginButton.style.display = 'none';
    //         adminButton.style.display = 'none';
    //         logoutButton.style.display = 'inline';
    //     } else if (localStorage.getItem("isLoggedIn") === 'admin') {
    //         logoutButton.style.display = 'inline';
    //         loginButton.style.display = 'none';
    //         adminButton.style.display = 'inline';
    //     } else {
    //         logoutButton.style.display = 'none';
    //         loginButton.style.display = 'inline';
    //         adminButton.style.display = 'none';
    //     }
    // }

    // const processSearch = () => {
    //     const input = document.getElementById("searchQueryInput").value;
    //     if (input) {
    //         window.location.href = `${BASE_PATH}/products/page/1/` + input;
    //     }
    //     return false;
    // }

 
    // // Menu toggle when screen width is <= 800px
    // // const menuToggle = () => {
    // //     const menuItems = document.getElementById("menuItems");
    // //     if (menuItems.style.maxHeight == "0px") {
    // //         menuItems.style.maxHeight == "200px";
    // //     } else {
    // //         menuItems.style.maxHeight == "0px";
    // //     }
    // // }


    //         // getting all required elements
          

    //         inputBox.onkeyup = (e) => {
    //             let reg = new RegExp(/[^a-zA-Z0-9 ]/gi);
    //             let searchKey = e.target.value.replace(reg, "");
    //             if (searchKey.length < e.target.value.length) return;
    //             if (searchKey) {
    //                 const url = `${BASE_PATH}/products/search/` + searchKey;
    //                 fetch(url)
    //                     .then(response => response.text())
    //                     .then(data => {
    //                         console.log(data);
    //                         let obj = JSON.parse(data);
    //                         if (data.length > 2) {
    //                             let arr = [];
    //                             obj.forEach(o => {
    //                                 arr.push("<li>" + o['Product']['name'] + '</li>');
    //                             })
    //                             searchWrapper.classList.add("active");
    //                             suggBox.innerHTML = arr.join('');
    //                             let allList = suggBox.querySelectorAll("li");
    //                             for (let i = 0; i < allList.length; i++) {
    //                                 allList[i].setAttribute("onclick", "select(this)");
    //                             }
    //                         }
    //                     });
    //             } else {
    //                 searchWrapper.classList.remove("active"); // hide autocomplete box
    //             }
    //         }

    //         const select = (element) => {
    //             inputBox.value = element.textContent;
    //             searchWrapper.classList.remove("active");
    //         }

    //         document.addEventListener("click", () => {
    //             searchWrapper.classList.remove("active");
    //         });


  return (
    <div className="header">
        <div className="navbar">
            <div className="name">
                <Link to="/">
                    <img style={{width: '4rem', height: '4rem', borderRadius: '50%', objectFit:'cover'}} src={logo} />
                </Link>
            </div>
            <form className="wrapper"  onSubmit={"return processSearch();"}>
                <div className="search-input">
                    <a href="" target="_blank" hidden></a>
                    <input id="searchQueryInput" type="text" placeholder="Type to search.." value=""/>
                    <button className="icon" id="searchQuerySubmit" type="submit" /*name="searchQuerySubmit"*/>
                        <span className="material-icons md-24"><SearchIcon /></span>
                    </button>
                    <div className="autocom-box">
                        {/* <!-- here list are inserted from javascript --> */}
                    </div>
                </div>
            </form>
            <nav className="nav-header-menu">
                <ul id="menuItems">
                    {/* <!-- Put something here --> */}
                    {role * isLogged !== 0 ? (<li id="admin"><Link to="/admin">Admin</Link></li>) : undefined}
                    <li><Link to="/products/page">Products</Link></li>
                    <li><Link to="/users/update">Account</Link></li>
                    {!isLogged ?  (<li id="login"><Link to="/users/login">Log in</Link></li>) : undefined}
                    {isLogged ? (<li id="logout" onClick={() => {logOut()}}><Link to="/users/login">Log out</Link></li>): undefined}
                </ul>
            </nav>
            <Link to="/carts/index">
                <img src={CartIcon} width="30px" height="30px"/>
            </Link>
            <img src={MenuIcon} className="menu-icon" onClick={"menuToggle()"}/>
        </div>
    </div>
  )
}
