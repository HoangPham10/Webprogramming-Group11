import axios from 'axios'

export const getFeaturedProducts = async() => {
    return await axios.get('/product/featured_product');
}

export const getLatestProducts = async() => {
    return await axios.get('/product/latest_product');
}

export const getProducts = async(id = 0, brands = 'All',  Price ="All", Sort = "ASC") => {
    const page = id ? id : 0;
    return await axios.post('/product',{page, brands, Price, Sort});
}

export const getProduct = async(id) => {
    return await axios.get('/product/'+id);
}
