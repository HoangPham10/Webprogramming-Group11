import axios from 'axios'

export const getPayments = async() => {
    return await axios.get('/payment');
}
