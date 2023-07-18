import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import {AdvancedImage} from "@cloudinary/react";
import { 
    Button,
    Popover,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import {BsThreeDots} from 'react-icons/bs'
import SubmitComment from './SubmitComment';

const Comment = styled.div`
    display: flex;
    flex-direction: column;
    border: solid lightgray;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
`;

const AuthorComment = styled.div`
    color: gray;
    display: flex;
    margin-bottom: 10px;
    align-items: center;
`;

const AuthorCommentInfos = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const Date = styled.div`
    font-size: 0.7rem;
`;

const CommentCard = ({comment, comments, setComments, productID}) => {
    const user = useSelector(state => state.user.profile);
    const [modify, setModify] = useState(false);
    const [isOpenCommentActions, setIsOpenCommentActions] = useState(false);
    
    const handleDelete = async() => {
        const responseDB = await fetch(`/product/${productID}/comment/${comment.id}`,{
            method: 'DELETE'
        });
        if(responseDB.status == 200){
            setComments(previous => previous.filter(element => comment.id != element.id));
        }
    }
    
    return (
        <Comment>
            <AuthorComment>
                <AdvancedImage cldImg={comment.avatar_cloud} style={{maxHeight: '50px', borderRadius: '50%', marginRight: '10px'}} />
                <AuthorCommentInfos>
                    <div>{comment.firstname} {comment.lastname}</div>
                    <Date>at {comment.created_at} {comment.updated_at && `updated at ${comment.updated_at}`}</Date>
                </AuthorCommentInfos>
                {
                    user && comment.email == user.email && !modify && (
                        <>
                            <Button outline id={`commentActions${comment.id}`} style={{padding: '0 4px', border: 'none'}}><BsThreeDots /></Button>
                            <Popover
                                target={`commentActions${comment.id}`}
                                placement="bottom"
                                trigger="focus"
                                isOpen={isOpenCommentActions}
                                toggle={() => setIsOpenCommentActions(!isOpenCommentActions)}
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
                )}
            </AuthorComment>
            {
                modify 
                ? (<SubmitComment productID={productID} comments={comments} setComments={setComments} method={'PUT'} modify={modify} setModify={setModify} comment={comment}/>)
                : (<p>{comment.comment}</p>)
            }
        </Comment>
    );
};

export default CommentCard;