import axios from "axios";


export const registerAPI = async(data) => {
    return await axios.post('/user/register', data);
}


export const loginAPI = async(data) => {
    return await axios.post('/user/login', data);
}

export const refresh_token = async() => {
    return await axios.get('/user/refresh_token',{withCredentials: true, credentials: 'include'});
}

export const getUser = async(token) => {
    return await axios.get('/user',{
        headers: {
            'Authorization': `bearer ${token}`,
        }
    });
}


export const updateAPI = async(token, data) => {
    return await axios.post('/user/update', data,{
        headers: {
            'Authorization': `bearer ${token}`,
        }
    });
}


export const logoutAPI = async() => {
    return await axios.get('/user/logout');
}


export const addToCartAPI = async(token,data) => {
    return await axios.post('/user/addToCart', data,{
        headers: {
            'Authorization': `bearer ${token}`,
        }
    })
}

export const decreaseQty = async(token,data) => {
    return await axios.post('/user/decreaseToCart', data,{
        headers: {
            'Authorization': `bearer ${token}`,
        }
    })
}


export const removeProductToCart = async(token,data) => {
    return await axios.post('/user/removeToCart', data,{
        headers: {
            'Authorization': `bearer ${token}`,
        }
    })
}


export const createTransaction = async(token, data) => {
    return await axios.post('/transaction', data,{
        headers: {
            'Authorization': `bearer ${token}`,
        }
    })
}

export const transactionMethod = async(token, data) => {
    return await axios.post('/transaction/method', data,{
        headers: {
            'Authorization': `bearer ${token}`,
        }
    })
}


export const postReview = async(token, data) => {
    return await axios.post('/review', data,{
        headers: {
            'Authorization': `bearer ${token}`,
        }
    })
}

export const getReview = async(id) => {
    return await axios.get('/review/'+ id)
}