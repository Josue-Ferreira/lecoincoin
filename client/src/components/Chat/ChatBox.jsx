import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Button,
    Offcanvas,
    OffcanvasBody,
    OffcanvasHeader
} from 'reactstrap'

const ChatBox = () => {
    const [open, setOpen] = useState(false);
    const user = useSelector(state => state.user.profile);

    const handleToggle = () => {
        setOpen(!open);
    }

    return (
        <>
            {
                user && (
                    <Button color="info" onClick={handleToggle} style={{position: 'fixed', bottom: '10px', right: '10px'}}>
                        Messages
                    </Button>
            )}
            <Offcanvas 
                fade 
                direction='end' 
                isOpen={open} 
                toggle={handleToggle}>
                <OffcanvasHeader toggle={handleToggle}>
                    Discussions
                </OffcanvasHeader>
                <OffcanvasBody>

                </OffcanvasBody>
            </Offcanvas>
        </>
    );
};

export default ChatBox;