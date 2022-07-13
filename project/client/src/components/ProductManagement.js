import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateProduct from '../pages/CreateProduct';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


export default function ProductManagement() {
    const [products, setProducts] = useState([])
    const {token} = useSelector(state => state.user)
    const [showCreateProduct, setshowCreateProduct] = useState({
        isShow: false,
        isEdit: false,
        product: {},
    })
    useEffect(() => {
        const fetchData = async() =>{
            const response = await axios.get('/product');
            setProducts(response.data.products);
        }
        fetchData();
    }, [])
    
  return (
    <>
        <Button style={{marginTop: '10px', marginBottom: '10px'}} variant="contained" onClick={() => {setshowCreateProduct({
            isShow: true,
            isEdit: false,
            product: {},
        })}}>Create <AddIcon/></Button>

        {showCreateProduct.isShow && <CreateProduct onEdit={showCreateProduct.isEdit} editProduct={showCreateProduct.product} setProducts={setProducts}/>}
        <table className='index-table table-details' border='1' style={{width:'100%'}}>
            <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>OS</th>
                <th>Chipset</th>
                <th>Ram</th>
                <th>Display</th>
                <th>Resolution</th>
                <th>Camera</th>
                <th>Memory</th>
                <th>Pin</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th> 
                <th>Action</th>
            </tr>
            {
                products.map((item) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.category_id}</td>
                        <td>{item.OS}</td>
                        <td>{item.chipset}</td>
                        <td>{item.ram}</td>
                        <td>{item.display}</td>
                        <td>{item.resolution}</td>
                        <td>{item.camera}</td>
                        <td>{item.memory}</td>
                        <td>{item.pin}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td><img src={item.image} /></td> 
                        <td>
                            <EditIcon  style={{color: 'blue'}} onClick={() => {setshowCreateProduct({...showCreateProduct, isEdit: true, isShow:true, product:item})}}/> 
                            <DeleteIcon 
                                onClick={async() => {const response = await axios.delete('/product/'+item.id, {
                                        headers: {
                                            'Authorization': `bearer ${token}`,
                                        }
                                    })
                                    setProducts(response.data.products)}} 
                                    style={{color: 'red'}} 
                            />
                        </td>
                    </tr>
                ))
            }
        </table>
    </>
  )
}
