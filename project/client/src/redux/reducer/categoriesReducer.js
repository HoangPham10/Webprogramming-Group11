import { Types } from "../Type"

const categories = {
    category: [],
}

export const categoryReducer = (state = categories, action) => {
    switch (action.type) {
        case Types.GET_CATEGORIES:
            return {...state, category: action.payload}
        default:
            return state
    }
}