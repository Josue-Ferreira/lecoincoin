import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CommentCard from './CommentCard';
import SubmitComment from './SubmitComment';
import { useSelector, useDispatch } from 'react-redux';
import {refreshAllList} from '../../features/comment/commentSlice';
import { fetchGet } from '../../helpers/fetchBack';

const CommentContainer = styled.div`
    display: flex;
    width: 80%;
    margin: 50px auto;
    flex-direction: column;
`;

const CommentsList = ({productID}) => {
    const user = useSelector(state => state.user.profile);
    const comments = useSelector(state => state.comments.content);
    const dispatch = useDispatch();

    useEffect(() => {
        const getComments = async() => {
            const json = await fetchGet(`/product/${productID}/comment/all`);
            dispatch(refreshAllList(json.comments));
        }

        getComments();
    }, []);

    return (
        <CommentContainer>
            {comments && comments.map(comment => (
                <CommentCard key={comment.id} comment={comment} productID={productID} />
            ))}
            {user && <SubmitComment productID={productID} />}
        </CommentContainer>
    );
};

export default CommentsList;