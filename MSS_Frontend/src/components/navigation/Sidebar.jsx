import { AiFillHome, AiFillGithub } from 'react-icons/ai';
import { FiMusic, FiUsers, FiAnchor, FiHeart } from 'react-icons/fi';
import { MdAutoAwesome } from "react-icons/md";
import { GiMusicSpell } from 'react-icons/gi';
import NavLink from './NavLink';
import Link from 'next/link';
import { VscHeartFilled ,VscSmiley } from "react-icons/vsc";
import LogoutButton from '../logoutBtn/logoutBtn';
import { RiLogoutCircleLine } from "react-icons/ri";
import { FcDebian } from "react-icons/fc";
import { TbPlaylist } from "react-icons/tb";
import { BiAlbum } from "react-icons/bi";

const Sidebar = () => {
    return (
        <div className='sidebar'>
            
            <Link className='app-logo' href='/' >
            
            <FcDebian />
                {/* <span>MSS</span> */}
            </Link>
            
            <div>
                <h2>DISCOVER</h2>

                <ul>
                    <li>
                        <NavLink slug=''>
                            <AiFillHome />
                            <span>Home</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink slug='top_tracks'>
                            <FiMusic />
                            <span>Songs</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink slug='top_artists'>
                            <FiUsers />
                            <span>Artists</span>
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink slug='album_list'>
                        <BiAlbum />
                            <span>Album</span>
                        </NavLink>
                    </li> */}

                    <li>
                        <NavLink slug='allplaylist'>
                        <TbPlaylist />
                            <span>Playlists</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink slug='mpick'>
                        {/* <MdAutoAwesome /> */}
                        <VscSmiley />
                            <span>Moods</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink slug='picks'>
                        <MdAutoAwesome />
                            <span>Picks</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div>
                <h2>My Data</h2>
                <ul>
                    <li>
                        <NavLink slug='favorites'>
                            {/* <FiHeart /> */}
                            <VscHeartFilled />
                            <span>Favorites</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            <a href='' >
            <RiLogoutCircleLine />
                <span><LogoutButton /></span>
            </a>
        </div>
    );
};

export default Sidebar;
