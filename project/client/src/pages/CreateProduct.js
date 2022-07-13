import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Loading from '../components/Loading/Loading'
import { getCategories } from '../apis/categoryAPIs'
import classes from './CreateProduct.module.css'

const initialValues = {
        name: "Macbook Pro 16\" 2021 M1 Pro Ram 32GB",
        quantity: 6,
        category_id: 1,
        OS: "MacOS Ventura",
        chipset: "Apple M1 Pro",
        ram: "32 GB",
        display: "mini LED 16\"",
        resolution: "3456 x 2234 Pixels",
        camera: "1080p",
        memory: "1 TB",
        pin: "7756 mAh",
        description: "Bảo hành 12 tháng chính hãng, bao xài đổi trả trong 15 ngày.",
        price: 2799,
}


export default function CreateProduct({onEdit, editProduct,setProducts}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const {role, token} = useSelector(state => state.user)
    const [images, setImages] = useState(false)
    const [product, setProduct] = useState(onEdit ? editProduct : initialValues)
    const [categories, setCategories] = useState([])

    useEffect(() => {
      const getCategoriesData = async() => {
        const response = await getCategories();
        setCategories(response.data.categories)
      }
      getCategoriesData();
    }, [])

    useEffect(() => {
        if(onEdit){
            setProduct(editProduct);
        }
    }, [editProduct])
    
    


    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }
    
    const styleUpload = {
        display: images ? "block" : "none"
    }

    const handleDestroy = async () => {
        try {
    
            if(!role) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {url: images.url}, {
                headers: {'Authorization': `bearer ${token}`}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!role) return alert("You're not an admin")
            if(!images) return alert("No Image Upload")

            if(onEdit){
                const response = await axios.put(`api/product/${product.id}`, {...product, image: images.url}, {
                    headers: {'Authorization': `bearer ${token}`}
                })
                setProducts(response.data.products)
            }else{
                const response = await axios.post('api/product', {...product, image: images.url}, {
                    headers: {'Authorization': `bearer ${token}`}
                })
                setProducts(response.data.products)
            }
            // dispatch({type: actionType.UPDATE_PRODUCT_CALLBACK})
            navigate('/');
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!role) return alert("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', 'Authorization': `bearer ${token}`}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }
  return (
    <div className={classes.create_product}>
            <div className={classes.upload}>
                <input type="file" name="file" className={classes.file_up} onChange={handleUpload}/>
                {
                    loading ? <div className={classes.file_img}><Loading /></div>

                    :<div className={classes.file_img} style={styleUpload}>
                        <img src={images ? images.url : ''} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>

            <form onSubmit={handleSubmit}>
                <div className={classes.row}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" required
                    value={product.name} onChange={handleChangeInput} disabled={onEdit} />
                </div>

                <div className={classes.row}>
                    <label htmlFor="quantity">Quantity</label>
                    <input type="number" name="quantity" id="quantity" required
                    value={product.quantity} onChange={handleChangeInput} />
                </div>

                <div className={classes.row}>
                    <label htmlFor="category_id">Categories: </label>
                    <select name="category_id" value={product.category_id} onChange={handleChangeInput} >
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category.id} key={category.id}>
                                    {category.brand}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className={classes.row}>
                    <label htmlFor="OS">OS</label>
                    <input type="text" name="OS" id="OS" required
                    value={product.OS} onChange={handleChangeInput} />
                </div>

                <div className={classes.row}>
                    <label htmlFor="chipset">chipset</label>
                    <input type="text" name="chipset" id="chipset" required
                    value={product.chipset} onChange={handleChangeInput} />
                </div>

                
                <div className={classes.row}>
                    <label htmlFor="ram">ram</label>
                    <input type="text" name="ram" id="ram" required
                    value={product.ram} onChange={handleChangeInput} />
                </div>

                
                <div className={classes.row}>
                    <label htmlFor="display">chipset</label>
                    <input type="text" name="display" id="display" required
                    value={product.display} onChange={handleChangeInput} />
                </div>

                
                <div className={classes.row}>
                    <label htmlFor="resolution">resolution</label>
                    <input type="text" name="resolution" id="resolution" required
                    value={product.resolution} onChange={handleChangeInput} />
                </div>

                
                <div className={classes.row}>
                    <label htmlFor="camera">camera</label>
                    <input type="text" name="camera" id="prcameraice" required
                    value={product.camera} onChange={handleChangeInput} />
                </div>


                
                <div className={classes.row}>
                    <label htmlFor="memory">memory</label>
                    <input type="text" name="memory" id="memory" required
                    value={product.memory} onChange={handleChangeInput} />
                </div>

                <div className={classes.row}>
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={product.description} rows="5" onChange={handleChangeInput} />
                </div>


                <div className={classes.row}>
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                    value={product.price} onChange={handleChangeInput} />
                </div>

            
               

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
  )
}
