import { Types } from "../Type"

const user = {
    isLogged: 0,
    username: '',
    password: '',
    email: '',
    address: '',
    phone: '',
    role: 0,
    token: '',
    name: '',
    cart:[],
}

export const UserReducer = (state = user, action) => {
    switch (action.type) {
        case Types.LOGIN_SUCCESSFULL:
            return {...state,
                isLogged: 1,
                username: action.payload.user.username,
                email: action.payload.user.email,
                name: action.payload.user.name,
                address: action.payload.user.address,
                phone: action.payload.user.phone,
                role: action.payload.user.role === 'user' ? 0 : 1,
                token: action.payload.accessToken,
            }
        case Types.GET_USER:
            return {
                ...state,
                isLogged: 1,
                username: action.payload.username,
                email: action.payload.email,
                name: action.payload.name,
                address: action.payload.address,
                phone: action.payload.phone,
                role: action.payload.role === 'user' ? 0 : 1,
            }
        case Types.REFRESH_TOKEN:
            return {...state, token: action.payload}
            
        case Types.UPDATE_SUCCESSFULL:
            return {...state,
                name: action.payload.name,
                address: action.payload.address,
                phone: action.payload.phone,
            }
        case Types.LOGOUT:
            return {
                ...state,
                isLogged: 0,
                username: '',
                password: '',
                email: '',
                address: '',
                phone: '',
                role: 0,
                token: '',
                name: '',
            }

        case Types.ADD_TO_CART: 
            return {
                ...state,
                cart: action.payload
            }

        default:
            return state
    }
}