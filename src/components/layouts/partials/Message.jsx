import React from 'react'
import {Link} from 'react-router-dom'
import LottiePlayer from './LottiePlayer';
import CheckData from '../../_data/check-green.json'
import CheckError from '../../_data/error.json'

const Message = ({title, message, action, type, buttonText}) => {

    const fireAction = (e) => {
        e.preventDefault()
        action()
    }
    return(
        <>
            <div className="mrgb2 mrgt2">
                <LottiePlayer 
                    w={"100px"}
                    h={"100px"}
                    loop={true}
                    lottieData={type === 'success' ? CheckData : CheckError}
                />
            </div>
            <h3 className="fs-18 onmineshaft ui-text-center">
                {title ? title : 'No title'}
            </h3>
            <p className="fs-14 onmineshaft ui-text-center">{message ? message : 'No message'}</p>
                <Link onClick={e => fireAction(e)} className="btn btn-lg btn-block bg-silver onmineshaft font-weight-bold fs-16">{buttonText ? buttonText : 'continue'}</Link>
        </>
    )
}

export default Message;