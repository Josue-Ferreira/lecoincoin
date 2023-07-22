import React, {useState} from 'react';
import{
    Button,
    Popover,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import {BsThreeDots} from 'react-icons/bs';

const MenuModifyDelete = ({component, setModify, handleDelete}) => {
    const [isOpencomponentActions, setIsOpencomponentActions] = useState(false);
    return (
        <>
            <Button outline id={`componentActions${component.id}`} style={{padding: '0 4px', border: 'none'}}><BsThreeDots /></Button>
                <Popover
                    target={`componentActions${component.id}`}
                    placement="bottom"
                    trigger="focus"
                    isOpen={isOpencomponentActions}
                    toggle={() => setIsOpencomponentActions(!isOpencomponentActions)}
                >
                        <ListGroup flush>
                            <ListGroupItem
                                action
                                tag="button"
                                onClick={() => setModify(true)}
                                style={{borderRadius: '20px 20px 0 0'}}
                            >
                                Modify
                            </ListGroupItem>
                            <ListGroupItem
                                action
                                tag="button"
                                onClick={handleDelete}
                                style={{borderRadius: '0 0 20px 20px'}}
                            >
                                Delete
                            </ListGroupItem>
                        </ListGroup>
                </Popover> 
        </>
    );
};

export default MenuModifyDelete;