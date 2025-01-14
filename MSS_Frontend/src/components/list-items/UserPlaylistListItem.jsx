import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import { purple, deepPurple } from '@mui/material/colors';
import UserLinkCardItem from '../list-items/UserLinkCardItem';

const UserPlaylistListItem = ({ id, title, imgSrc,editbtn ,delelebtn}) => {
      {/* <img src={ imgSrc } alt='playlist-img' /> */}

    return (
        <li className='playlist-item'>
            {/* <Link href={ `playlist/${ id }` }>
                <Avatar sx={{ bgcolor: purple[600] }}>{ id }</Avatar>
                <div className='playlist-details'>
                <strong>{ title }</strong>
                    
                    
                </div>
            </Link> */}

                <UserLinkCardItem
                    // key={ id }
                    title={ title }
                    imgSrc= { imgSrc }
                    href={ `userPlaylist/${ id }` }
                    description={ ` 0 Fans | 0 Albums` }
                    btn1={editbtn}
                    btn2={delelebtn}
                    // description={ `${ formattedFanNumber } Fans | ${ nb_album } Albums` }
                />
                


        </li>
    );
};

export default UserPlaylistListItem;