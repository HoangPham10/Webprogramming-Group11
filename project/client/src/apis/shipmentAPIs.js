import axios from 'axios'

export const getShipments = async() => {
    return await axios.get('/shipment');
}
