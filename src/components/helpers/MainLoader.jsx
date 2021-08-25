import React from 'react';

const MainLoader = () => {
    return(
        <>
            <div>
                <div className="suspense">
                    <div className="suspense_image">
                        <img src={'../../images/assets/spinner.svg'} alt="spinner" width="80px" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainLoader;