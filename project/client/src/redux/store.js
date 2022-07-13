import {combineReducers, createStore} from 'redux'
import { categoryReducer } from './reducer/categoriesReducer';
import { productsReducer } from './reducer/productReducers';
import { UserReducer } from './reducer/userReducer';

//Import Reducer
const reducer = combineReducers({
    user: UserReducer,
    category: categoryReducer,
    product: productsReducer,
})


const store = createStore(reducer, []);

export default store;

