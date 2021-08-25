import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';

const Friend = ({ name, email, photo }) => {
    return (
        <>
            <div className="frnd-box">
                <div>
                    <img src={photo ? photo : "../../../images/assets/avatar.svg"} alt="avatar.svg" />
                </div>

                <div className="pd1">
                    <h3 className="mrgb0 fs-14 onmine-shaft font-weight-medium">{name ? name : 'No name'}</h3>
                    <p className="mrgb0 fs-12 onmine-shaft font-weight-medium">{email ? email : 'No email'}</p>
                </div>
                <div className="ml-auto">
                    <div className="fe fe-chevron-right fs-15 onsilver"></div>
                </div>
            </div>
        </>
    )
}

export default Friend;