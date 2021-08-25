import React from 'react'
import CheckData from '../../_data/check-green.json'
import Lottie from 'react-lottie'

const lottiePlayer = ({ lottieData, w, h, loop  }) => {
    const defaultOptions = {
       loop:  loop ? loop : false,
       autoplay: true,
       animationData: lottieData ? lottieData : CheckData,
       rendererSettings: {
           preserveAspectRation: 'xMidYMid slice'
       }
    }
    return(
        <>
            <Lottie 
                options={defaultOptions}
                height={h}
                width={w}
                isStopped={false}
                isPaused={false}
            />

        </>
    )
}

export default lottiePlayer