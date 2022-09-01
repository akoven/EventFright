import React from 'react';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';

const SplashPage = () =>{

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)



    return(
        <div className='main'>
            <div className='banner-div'>
                <h1>Events and frontpage image will appear here</h1>
                <div>
                    <img className='banner-img' src='https://i.ytimg.com/vi/Ah7285f_byI/maxresdefault.jpg' alt='https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/lake-michigan-moonrise-steve-gadomski.jpg'/>
                </div>
            </div>
            {/* <div>
                <h3>Check out these categories</h3>
                <h3>Local Events</h3>

            </div> */}

        </div>
    )
}

export default SplashPage;
