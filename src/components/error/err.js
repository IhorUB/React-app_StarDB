import React from 'react';
import star from './death-star.png';
const ErrIndicator = () => {
    return (
        <div className='error-indicator'>
            <img src={star} alt="death"/>
            <span className='boom'>knock knock!</span>
            <span>Huston, some bad news for you app!</span>
            <span>(Don't worry about it, we tried to fix it)</span>
        </div>
    )
};
export default ErrIndicator;