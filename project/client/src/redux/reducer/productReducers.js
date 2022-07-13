import { Types } from "../Type"

const products = {
    products: [],
}

export const productsReducer = (state = products, action) => {
    switch (action.type) {
        case Types.GET_PRODUCTS:
            return {...state, products: action.payload}
        default:
            return state
    }
}