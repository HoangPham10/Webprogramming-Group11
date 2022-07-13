import React,{useState, useEffect} from 'react'
import './ProductDetail.css'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { addToCartAPI, getReview, postReview } from '../apis/userAPIs';
import { Types } from '../redux/Type';
import { getProduct } from '../apis/productAPIs';



export default function ProductDetail() {
    const {products} = useSelector(state => state.product);
    const {id} = useParams();
    const [product, setProduct] = useState(products.find((item, key) => item.id.toString() === id))
    const {username, token} = useSelector(state => state.user);
    const [review, setReview] = useState({
        content : '',
        rating : 1
    })
    const stars = [1,2,3,4,5];
    const [comments, setComments] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getProductData = async() =>{
        const response = await getProduct(id);
        setProduct(response.data.product)
    } 

    useEffect(() => {
        if(!product){
            getProductData();
        }
    }, [])
    
    

    
      
 
    useEffect(() => {
      const getCommnetsData = async() =>{
        const response = await getReview(id);
        setComments(response.data.reviews)
      } 
      getCommnetsData();
    }, [id])
    


    const addToCart = async() => {
        const response = await addToCartAPI(token, {username: username, product: product})
        const cart = response.data.cart.map(item => ({image: item.image, price: item.price,name:item.name, product_id: item.product_id, quantity: item.quantity}))

        dispatch({type: Types.ADD_TO_CART, payload : cart})
        navigate('/carts/index');
    }

    const onChangeReview = (e) => {
        const {name, value} = e.target;
        setReview({...review, [name]: value})
    }

    const submitReviewHander = async() => {
        const payload = {
            username,
            product_id: id,
            content: review.content,
            rating: review.rating
        }
        const response = await postReview(token, payload);
        if(response.data.msg){
            alert(response.data.msg)
            return
        }
        setComments(response.data.reviews)
    }

    console.log('product', product)
  return (
    product ? (<>

        {/* // <!-- Product description --> */}
        <div className="small-container single-product">
            <div className="row">
                {/* <!-- Product images --> */}
                <div className="col-2">
                    <img src={product.image}  id="productImage" />
                    <div className="small-img-row">
                    </div>
                </div>

                <div className="col-2">
                    <div className="path">
                        <Link to="/products/page">Products/</Link>
                        <p>{product.name}</p>
                    </div>
                    <h1>{product.name}</h1>
                    <h4>${product.price}</h4>
                    {
                        product.quantity === 0 ? (<h4 style={{color: "red"}}>This product is out of stock!</h4>) : <button onClick={() => {addToCart()}}  class="button" >Add To Cart</button>
                    }
            
                    {/* <input type="hidden" id="id" name="id" value=<?php echo $product['Product']['id'] ?>> */}
                    <h3>Description <i className="fa fa-ident"></i></h3>
                    <p>{product.description}</p>
                </div>
            </div>
        </div>

        {/* <!-- Product information --> */}
        <div className="small-container">
            <div className="row row-2">
                <h2>Product Details</h2>
            </div>
            <div className="row">
                <table className="table-details">
                    <thead>
                        <tr>
                            <th>Quantity</th>
                            <th>OS</th>
                            <th>Chipset</th>
                            <th>RAM</th>
                            <th>Display</th>
                            <th>Resolution</th>
                            <th>Camera</th>
                            <th>Memory</th>
                            <th>Battery</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{product.quantity}</td>
                            <td>{product.OS}</td>
                            <td>{product.chipset}</td>
                            <td>{product.ram}</td>
                            <td>{product.display}</td>
                            <td>{product.resolution}</td>
                            <td>{product.camera}</td>
                            <td>{product.memory}</td>
                            <td>{product.pin}</td>
                        </tr>
                    </tbody>
                </table>
             </div>
        </div>
        
    {/* <!-- Reviews --> */}
        <div className="small-container">
            <div className="row row-2">
                <h2>Reviews</h2>
            </div>
            <div className="review-box" style={{marginBottom: '30px'}}>
                <input type="hidden" id="idForReview" name="idForReview" value={product.id} />
                <label>Your review</label>
                <input required type="text" id="content" name="content" value={review.content} onChange={(e) => onChangeReview(e)}  placeholder="Leave your review here" />
                <label>Rate this product</label>
                <div className="rate" style={{marginBottom: '10px'}}>
                    <input type="radio" id="star5" onChange={(e) => onChangeReview(e)} name="rating" value="5" />
                    <label for="star5" title="text">5 stars</label>
                    <input type="radio" id="star4" onChange={(e) => onChangeReview(e)} name="rating" value="4" />
                    <label for="star4" title="text">4 stars</label>
                    <input type="radio" id="star3" onChange={(e) => onChangeReview(e)} name="rating" value="3" />
                    <label for="star3" title="text">3 stars</label>
                    <input type="radio" id="star2" onChange={(e) => onChangeReview(e)} name="rating" value="2" />
                    <label for="star2" title="text">2 stars</label>
                    <input type="radio" id="star1" onChange={(e) => onChangeReview(e)} name="rating" value="1" />
                    <label for="star1" title="text">1 star</label>
                </div>
                <button onClick={submitReviewHander} className="button">Post review</button>
            </div>
            <div className="review-box">
                <div style={{width: '100%'}}>
                    <label style={{textTransform: 'uppercase'}}>Others's reviews</label>
                    {
                        comments.map((item, key) => (
                            <div className="user-review">
                                <div className="row comment" >
                                    <h4>{item.username}</h4>
                                    <div className="user-rate-star" style={{marginLeft: '10px'}}>
                                    {
                                        stars.map(index => index <= item.rating ? <span className="fa fa-star checked" style={{color: '#ff523b'}}></span> : <span class="fa fa-star"></span>)
                                    }
                                </div>
                            </div>
                            <div className="row comment"  >
                                <p>{item.content}</p>
                            </div>
                        </div>
                        ))
                    }
                    
                </div>
            </div>
        </div>

    {/* <!-- Related products -->
    <div class="small-container">
        <div class="row row-2">
            <h2>Related Products</h2>
        </div>
        <div class="row">
            <?php
                forEach($relatedProducts as $product) {
                ?>
                <div class="col-4" id="relatedProducts">
                    <a href="<?php echo BASE_PATH . '/products/view/' . $product['Product']['id'] ?>">
                        <img src="<?php echo BASE_PATH . '/public/images/' . $product['Product']['image'] . '_0.jpg'; ?>">
                    </a>
                    <h4><?php echo $product['Product']['name']; ?></h4>
                    <p>$<?php echo $product['Product']['price']; ?></p>
                </div>
            <?php
            }
            ?>
        </div>
    </div> */}


    </>) : <h1>Error 404</h1>
  )
}
