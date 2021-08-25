import React, { useEffect, useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import storage from '../../helpers/storage';
import Body from '../../helpers/body'
import UserContext from '../../../context/user/userContext';


const SideMenu = () => {
    const userContext = useContext(UserContext);
    const history = useHistory()
    
    useEffect(() => {
        redirectToLogin()
        if(storage.checkToken()) {
            userContext.getUser()
            Body.changeBackground('dash-body');
        }
    }, [])

    const redirectToLogin = () => {
        if(!storage.checkToken() ){
            localStorage.clear()
            Body.dismissBackground('dash-body')
            history.push('/login')
        }


    }

    const logout = async (e) => {
        e.preventDefault()
        await storage.clearAuth()
        await Body.dismissBackground('dash-body')
        history.push('/login')
    }

    return (
        <>
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="sidebar-sticky pt-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className="nav-link" href="#">
                                <span className="fe fe-home pdr" />
                                Dashboard <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link onClick={e => logout(e)} className="nav-link active" href="#">
                                <span className="fe fe-log-out pdr" />
                                Logout 
                            </Link>
                        </li>
                        
                    
                    </ul>
                </div>
            </nav>




        </>
    )
}

export default SideMenu;