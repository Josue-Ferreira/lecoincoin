import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../features/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Popover,
  PopoverBody
} from 'reactstrap';
import {BsPersonCircle} from 'react-icons/bs'
import styled from 'styled-components';
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';

const UserMenu = styled.div`
  margin: 5px 0;  
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  &:hover{
    background-color: lightblue;
  }
`;

function NavigationBar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const user = useSelector(state => state.user.profile);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/');
  }

  const [avatar, setAvatar] = useState();

  useEffect(() => {
    if(user && user.avatar_cloud){
      const cld = new Cloudinary({cloud: {cloudName: process.env.REACT_APP_CLOUDINARY_NAME}});
      setAvatar(cld.image(user.avatar_cloud));
    }
  },[user]);

  return (
    <Navbar expand={'md'} >
        <NavbarBrand>LeCoinCoin</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
            <NavItem>
                <NavLink tag={Link} to='/' >
                    Home
                </NavLink>
            </NavItem>
            <NavItem>
                {user && (
                  <NavLink tag={Link} to='/add-product'>
                    Add New Product
                  </NavLink>
                )}
            </NavItem>
            </Nav>
            {
            user ? (
                <>
                    {avatar && <AdvancedImage style={{maxHeight: '50px', borderRadius: '50%', marginRight: '10px'}} cldImg={avatar} />}
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
                        <UserMenu>
                          <NavLink tag={Link} to='/profile'>
                            Profile
                          </NavLink>
                        </UserMenu>
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
            )
            }
        </Collapse>
    </Navbar>
  );
}

export default NavigationBar;