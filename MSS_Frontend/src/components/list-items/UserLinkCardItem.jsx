import Link from 'next/link';
import React from 'react';

const UserLinkCardItem = ({ href, imgSrc, title, description, btn1,btn2}) => {
    return (
        <li className='card-container'>
            <div className='old'>
            
            <Link href={ href }>
                <img src={ imgSrc } alt="" />
                <strong>{ title }</strong>
                
                {
                    description &&
                        // <small>{ description }</small>
                        <small>User Created </small>
                }
            </Link>
            {btn1}{btn2}
            </div>
        </li>
    );
};

export default UserLinkCardItem;