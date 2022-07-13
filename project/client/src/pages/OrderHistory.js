import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { getOrderHistory, getTransaction } from '../apis/orderAPIs'
import './OrderHistory.css'
import moment from 'moment'
import { formatDate } from '../utils/formatDate'
import {Box , Modal} from '@mui/material';



export default function OrderHistory() {
    const [orderHistory, setOrderHistory] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [transactions, setTransactions] = useState([])
    const {token, username} = useSelector(state => state.user);
    useEffect(() => {
      const getTransaction = async() => {
        const response = await getOrderHistory(token, {username})
        setOrderHistory(response.data.transaction)
      }
      getTransaction();
    }, [username, token])

    const viewDetails = async(id) => {
        try{
            const response = await getTransaction(token, id);
            setTransactions(response.data.transaction);
            setOpenModal(true);
        }catch(err){
            alert(err);
        }
        
    }
    
  return (
    <div style={{marginBottom: '10rem'}} className="small-container order-page">
        <TransactionDetail open={openModal} setOpen ={setOpenModal} transactions={transactions} />
        <div className="row row-2">
            <h2>Order History</h2>
        </div>
        <table>
            <tr>
                <th>#</th>
                <th>Date</th>
                <th>Total Bill</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Shipment</th>
                <th>Payment</th>
                <th>Detail</th>
            </tr>
            {
                orderHistory.map((item, index) =>(
                    <tr key={index}>
                        <td>
                            {index+1}
                        </td>
                        <td>
                            {moment.utc(formatDate(item.createdAt)).local().format('MMMM Do YYYY, h:mm:ss a')}
                        </td>
                        <td>
                            ${item.total_bill}
                        </td>
                        <td>
                            {item.phone}
                        </td>
                        <td>
                            {item.address}
                        </td>
                        <td>
                            {item.shipment_description}
                        </td>
                        <td>
                            {item.payment_description}
                        </td>
                        <td>
                            <span style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => {viewDetails(item.transaction_id)}} >View Detail</span>
                        </td>
                    </tr>
                ))
            }
        </table>
    </div>
    
  )
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: '100%',
    maxHeight: '300px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflowY: 'scroll',
    p: 4,
};


function TransactionDetail({open, setOpen, transactions}) {
    const handleClose = () => setOpen(false);
  
    return (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <Box sx={style} id='scroll'>
                        <span className="close" id={`close-${'item.transaction_id'}`} onClick={handleClose}>&times;</span>
                        <h3>Order detail</h3>
                        <table>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Image</th>
                                <th>Quantity</th>
                            </tr>
                            {
                                transactions.map((item, index) => (
                                    <tr key={index+1}>
                                        <td>
                                            {index+1}
                                        </td>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>
                                            <img src={item.image} />
                                        </td>
                                        <td>
                                            {item.quantity}
                                        </td>
                                    </tr> 
                                ))
                            }
                        </table>
            </Box>
        </Modal>
    )
}


