'use client';
import useCarousel from '@/hooks/useCarousel';
import { FcNext ,FcPrevious} from "react-icons/fc";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

const UserCarousel = ({ children, header, buttonrender}) => {
    const { carouselRef, next, prev } = useCarousel();

    return (
        <> 
            <div className='carousel-header-container'>
                { header && <h2>{ header }</h2> }


                <div className='carousel-buttons'>
                <Button variant="outlined" >
                    <IconButton onClick={ prev }  size="large"><FcPrevious /></IconButton>
                </Button>

                <Button variant="outlined" >
                    <IconButton onClick={ next } size="large"><FcNext /></IconButton>
                </Button>
                
                <Button  >
                { buttonrender }
                </Button>
                    
                </div>
            </div>

            <div className='carousel'>
                <ul ref={ carouselRef }>
                    { children }
                </ul>
            </div>
        </>
    );
};

export default UserCarousel;