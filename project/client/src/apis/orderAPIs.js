import axios from 'axios'

export const getOrderHistory = async(token, data) => {
    return await axios.post('/transaction/history',data,{
        headers: {
            'Authorization': `bearer ${token}`,
        }
    })
}

export const getTransaction = async(token, id) => {
    return await axios.get('/transaction/'+id,{
        headers: {
            'Authorization': `bearer ${token}`,
        }
    })
}