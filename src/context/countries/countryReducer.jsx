import {  GET_COUNTRIES, GET_COUNTRY, GET_IP_ADDRESS, SET_LOADING  } from '../Types';

export default (state, action) => {
    switch (action.type) {
        case GET_COUNTRIES: 
            return {
                ...state,
                countries: action.payload,
                loading: false
            }

        case GET_COUNTRY:
            return {
                ...state,
                country: action.payload,
                loading: false
            }
        case GET_IP_ADDRESS:
            return {
                ...state,
                ipData: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: false
            }
        default: 
            return state;
    }
}