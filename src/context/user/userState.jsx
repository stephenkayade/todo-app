import React, { useReducer } from 'react';
import axios from 'axios'
import UserContext from './userContext';
import UserReducer from './userReducer';
import storage from '../../components/helpers/storage';

// types to be used
import {
    GET_LOGGEDIN_USER,
    SET_LOADING
} from '../Types'

const UserState = props => {
    const initialState = {
        user: {},
        loading: false
    }


    const [state, dispatch] = useReducer(UserReducer, initialState)

    const getUser = async()=> {
        
        setLoading()
        
        await axios.get(`${process.env.REACT_APP_IDENTITY_URL}/auth/user`, storage.getConfigWithBearer())
        .then((resp) => {
            dispatch({
                type: GET_LOGGEDIN_USER,
                payload: resp.data.data
            })
        })
        .catch((err) => {
            console.log(`error cannot get user ${err}`);
        })
    }

    const setLoading = () => {
        dispatch({ type: SET_LOADING })
    }

    // this where state and context is made available globally
    return <UserContext.Provider
        value={{
            user: state.user,
            loading: state.loading,
            getUser
        }}
    >
        {props.children}
    </UserContext.Provider>
}

export default UserState;