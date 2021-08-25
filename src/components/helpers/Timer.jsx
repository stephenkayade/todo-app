import React, { useEffect, useState } from 'react'

const Timer = ({duration, size, timerColor}) => {

    useEffect(() => {
        calculateTimer(duration)
    }, [])

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const leadingZero = (num) => {
        return num < 10 ? '0' + num : num
    }

    const calculateTimer = (dur) => {
        let timer = dur, mins, secs
        setInterval(() => {
            mins = parseInt(timer / 60, 10)
            secs = parseInt(timer % 60, 10)

            if(--timer < 0){
                timer = dur
            }
            setMinutes(mins)
            setSeconds(secs)
        }, 1000)
    }

    return(
        <>
            <div className="fs-14 mrgb0 ui-text-center" style={{color: `${timerColor ? timerColor : '#000'}`, display: 'inline-block'}}>
                <span style={{fontSize: `${size ? size : '14px'}`}}>{leadingZero(minutes)}</span>
                <span style={{fontSize: `${size ? size : '14px'}`, margin: '0 0.3rem'}}>:</span>
                <span style={{fontSize: `${size ? size : '14px'}`}}>{leadingZero(seconds)}</span>
            </div>
        </>
    )
}

export default Timer;