import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import { purple, deepPurple } from '@mui/material/colors';
import LinkCardItem from '../list-items/LinkCardItem';

const PlaylistListItem = ({ id, title, imgSrc }) => {
      {/* <img src={ imgSrc } alt='playlist-img' /> */}

    return (
        <li className='playlist-item'>
            {/* <Link href={ `playlist/${ id }` }>
                <Avatar sx={{ bgcolor: purple[600] }}>{ id }</Avatar>
                <div className='playlist-details'>
                <strong>{ title }</strong>
                    
                    
                </div>
            </Link> */}

                <LinkCardItem
                    // key={ id }
                    title={ title }
                    imgSrc= { imgSrc }
                    href={ `playlist/${ id }` }
                    description={ ` 0 Fans | 0 Albums` }
                    // description={ `${ formattedFanNumber } Fans | ${ nb_album } Albums` }
                />



        </li>
    );
};

export default PlaylistListItem;