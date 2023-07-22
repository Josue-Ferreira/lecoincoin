import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import {AdvancedImage} from "@cloudinary/react";
import SubmitComment from './SubmitComment';
import { useDispatch } from 'react-redux';
import { removeComment } from '../../features/comment/commentSlice';
import { fetchDelete } from '../../helpers/fetchBack';
import MenuModifyDelete from '../features/MenuModifyDelete';

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

const CommentCard = ({comment, productID}) => {
    const user = useSelector(state => state.user.profile);
    const dispatch = useDispatch();
    const [modify, setModify] = useState(false);
    
    const handleDelete = async() => {
        const responseDB = await fetchDelete(`/product/${productID}/comment/${comment.id}`);
        if(responseDB.status == 200){
            dispatch(removeComment(comment));
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
                        <MenuModifyDelete component={comment} setModify={setModify} handleDelete={handleDelete} />
                )}
            </AuthorComment>
            {
                modify 
                ? (<SubmitComment productID={productID} modify={modify} setModify={setModify} comment={comment}/>)
                : (<p>{comment.comment}</p>)
            }
        </Comment>
    );
};

export default CommentCard;