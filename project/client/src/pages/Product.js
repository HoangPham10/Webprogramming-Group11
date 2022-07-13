import React, {useState, useEffect} from 'react'
import { getCategories } from '../apis/categoryAPIs'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import './Product.css'
import { Types } from '../redux/Type'
import { getProducts } from '../apis/productAPIs'
import {Link , useNavigate} from 'react-router-dom'

let filters = {
    brands: [],
    price: {
        low: 0,
        high: 10000,
    },
    sort: "ASC"
  };

export default function Product() {
  const [categories, setCategories] = useState([])
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(filters)
  const [searchQuery, setSearchQuery] = useState(filter)
  const [products, setProducts] = useState([])
  const [numPages, setNumPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  
  useEffect(() => {
    const getCategoryData = async() => {
      const response = await getCategories();
      setCategories(response.data.categories);
      dispatch({type: Types.GET_CATEGORIES, payload: response.data.categories});
    }
    getCategoryData();
  }, [])

  useEffect(() =>{
    const getProductsData = async() => {
        const {brands, price, sort} = searchQuery;
        const submitBrands = categories.map(item => item.id);
        const response = await getProducts(params.id, brands.length > 0 ? brands : submitBrands, price,sort);
        setProducts(response.data.products)
        setCurrentPage(response.data.currentPage)
        setNumPages(response.data.numPages)
        dispatch({type: Types.GET_PRODUCTS, payload: response.data.products});

    }
    getProductsData();
  }, [params, searchQuery,categories])


  const onChangeBrandsHandler = (e) => {
    if(e.target.checked){
        setFilter({...filter, brands: [...filter.brands, e.target.value]})
    }else{
        setFilter({...filter, brands: [...filter.brands.filter(item => item !== e.target.value)]})
    }
  }

  const onChangePriceHandler = (e) => {
    if(e.target.value === 'priceRange0'){
        setFilter({...filter, price:{
            low: 0,
            high: 100000,
        }})
    }else if (e.target.value === 'priceRange1'){
        setFilter({...filter, price:{
            low: 0,
            high: 500,
        }})
    }else if (e.target.value === 'priceRange2'){
        setFilter({...filter, price:{
            low: 500,
            high: 1000,
        }})
    }else if (e.target.value === 'priceRange3'){
        setFilter({...filter, price:{
            low: 1000,
            high: 2000,
        }})
    }else {
        setFilter({...filter, price:{
            low: 2000,
            high: 100000,
        }})
    }
  }

  let pages = []
  for (let i = 1; i <= numPages; i++){
    pages.push(i);
  }

  const PageComponent = (
    <>
        {
            pages.map((item, key) => (
                <Link to={'/products/page/'+item} ><span style={item.toString() === currentPage ? {backgroundColor: "#ff523b",color: "#fff"}: undefined} >{item}</span></Link>
            ))
        }
    </>
  )

  console.log(pages, currentPage)

 
  
  
  return (
    <>
        {/* <!-- Banner --> */}
        <div className="hero-image">
            <div className="hero-text">
                <h4>New arrivals</h4>
                <h2>Check out all products here</h2>
            </div>
        </div>

                {/* <!-- Products --> */}
        <div className="small-container">
            <div className="row">
                {/* <!-- Filters section --> */}
                <div className="filter-list">
                    <h2 style={{textTransform: "uppercase", "fontSize": "22px"}}>Filters</h2>
                    
                        {/* // <!-- Brand filter --> */}
                        <div className="filter-box">
                            <h4>Brands</h4>
                            {/* <!--Product search--> */}
                            {categories.map((item, index) => (
                               <div key={index} className="checkbox-row">
                                  <input className="brcb" id={item.id} type="checkbox" onChange={onChangeBrandsHandler} /*name="brands[]"*/ value={item.id} />
                                  <label for={item.id} className="checkmark">{item.brand}</label>
                              </div>
                            ))}
                        </div>

                        {/* <!-- Price filter --> */}
                        <div className="filter-box">
                            <h4>Price</h4>
                            <div className="radio-row">
                                <input type="radio" id="priceRange0"  onChange={onChangePriceHandler} name="priceRange" value="priceRange0"/>
                                <label for="priceRange0">Any price</label>
                            </div>
                            <div className="radio-row">
                                <input type="radio" id="priceRange1" onChange={onChangePriceHandler} name="priceRange" value="priceRange1"/>
                                <label for="priceRange1">$0 - $500</label>
                            </div>
                            <div className="radio-row">
                                <input type="radio" id="priceRange2" onChange={onChangePriceHandler} name="priceRange" value="priceRange2"/>
                                <label for="priceRange2">$500 - $1000</label>
                            </div>
                            <div className="radio-row">
                                <input type="radio" id="priceRange3"  onChange={onChangePriceHandler} name="priceRange" value="priceRange3"/>
                                <label for="priceRange3">$1000 - $2000</label>
                            </div>
                            <div className="radio-row">
                                <input type="radio" id="priceRange4" onChange={onChangePriceHandler} name="priceRange" value="priceRange4"/>
                                <label for="priceRange4">{"> $2000"}</label>
                            </div>
                        </div>

                        {/* <!-- Sort filter --> */}
                        <div className="filter-box">
                            <h4>Sort</h4>
                            {/* <!-- Order by price --> */}
                            <div className="select">
                                <select name="orderBy" id="orderBy" onChange={(e) => {setFilter({...filter, sort: e.target.value === 'low' ? 'ASC' : 'DESC'})}}>
                                    <option value="low">{"Sort by price (low -> high)"}</option>
                                    <option value="high">{"Sort by price (high -> low)"}</option>
                                </select>
                            </div>
                        </div>

                        <button className='button' onClick={() => {setSearchQuery(filter); navigate('/products/page/1')}}> Apply Filter</button>
                </div>

                 {/* <!-- Product section --> */}
                <div className="product-list">
                    <div className="row" style={{justifyContent: 'flex-start'}}>
                        {   
                            products.length === 0 ?
                            ( <h3 align='center'>No Products</h3>)
                            :
                            ( products.map((item, index) => (
                                    <div key={index} className="col-3" id="pagingProducts">
                                        <Link to={`/products/view/${item.id}`}>
                                            <img src={item.image} />
                                        </Link>
                                    <h4>{item.name}</h4>
                                    <p>${item.price}</p>
                                </div>
                                )))
                        }
                    </div>
                
                    <div className="row" style={{float:"left"}}>
                        {/* <!-- Page number --> */}
                        <div className="pagination">
                            {PageComponent}
                        </div>
                    </div>
                     
                </div>
            </div>
        </div>


    </>
  )
}
