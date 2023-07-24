import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {
    Button,
    Popover,
    PopoverBody,
    NavLink
} from 'reactstrap';
import {BsPersonCircle} from 'react-icons/bs'
import styled from 'styled-components';
import { logOut } from '../../features/user/userSlice';

const Menu = styled.div`
  margin: 5px 0;  
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  &:hover{
    background-color: lightblue;
  }
`;

const UserMenu = () => {
    const [avatar, setAvatar] = useState();
    const user = useSelector(state => state.user.profile);
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cld = new Cloudinary({cloud: {cloudName: process.env.REACT_APP_CLOUDINARY_NAME}});

    useEffect(() => {
        let intervalID;
        const fetchIsUserConnected = async() => {
            const responseDB = await fetch('/user');
            if(!(responseDB.status == 200)){
                dispatch(logOut());
            }
        }

        if(user){
            fetchIsUserConnected();
            intervalID = setInterval(() => {
                fetchIsUserConnected();
            }, (60*1000));
            if(user.avatar_cloud){
                setAvatar(cld.image(user.avatar_cloud));
            }
        }

        return () => {
            intervalID && clearInterval(intervalID);
        }
    },[user]);

    const handleLogOut = () => {
        dispatch(logOut());
        navigate('/');
    }

    return (
        <>
           {
                user ? (
                <>
                    {
                        avatar && (
                            <AdvancedImage style={{maxHeight: '50px', borderRadius: '50%', marginRight: '10px'}} cldImg={avatar} />
                    )}
                    <Button 
                        color='primary' 
                        style={{marginRight: "10px"}}
                        id='userMenu'
                        type='button'
                        >
                        {`Hello ${user.firstname}`}
                    </Button>
                    <Popover
                        target="userMenu"
                        placement="bottom"
                        trigger="focus"
                        isOpen={openUserMenu}
                        toggle={() => setOpenUserMenu(!openUserMenu)}
                    >
                        <PopoverBody>
                        <Menu>
                          <NavLink tag={Link} to='/profile'>
                            Profile
                          </NavLink>
                        </Menu>
                        <Button color='danger' onClick={handleLogOut} >Log out</Button>
                        </PopoverBody>
                    </Popover>
                </>
            ) : (
                <Button 
                    color='primary' 
                    style={{marginRight: "10px"}}
                    tag={Link}
                    to='/sign-in'
                    >
                    <BsPersonCircle style={{marginRight: '5px'}} />Sign In
                </Button>
            )}
        </>
    );
};

export default UserMenu;