import React, { useEffect, useContext, useState } from 'react'
import {  Link, useHistory  } from 'react-router-dom';
import SEO from '../layouts/partials/SEO'

const NotFOund = () => {

    const history = useHistory();               
    const goBack = () => {
        history.goBack()
    };               
    return(
        <>
            <SEO pageTitle="Todo - Not Found" />
            <div className="not-found">
                <img src={'../../../images/assets/404.svg'} alt="not found" width="120"/>
                <h3 className="mrgt1">Page Not Found !</h3>
                <Link onClick={goBack} className="btn btn-primary btn-lg on-white fs-15 mrgt">Go Back</Link>
            </div>
        </>
    )
}

export default NotFOund;
