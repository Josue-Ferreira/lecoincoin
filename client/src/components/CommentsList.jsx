import React, { useEffect, useState } from 'react';
import {Cloudinary} from "@cloudinary/url-gen";
import styled from 'styled-components';
import CommentCard from './CommentCard';
import SubmitComment from './SubmitComment';
import { useSelector, useDispatch } from 'react-redux';
import {refreshAllList} from '../features/comment/commentSlice';

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
    const cld = new Cloudinary({
        cloud: {
          cloudName: process.env.REACT_APP_CLOUDINARY_NAME
        }
      }); 

    useEffect(() => {
        const getComments = async() => {
            const responseDB = await fetch(`/product/${productID}/comment/all`);
            if(responseDB.status == 200){
                const responseDBJSON = await responseDB.json();
                responseDBJSON.comments.forEach((comment,i) => {
                    responseDBJSON.comments[i].avatar_cloud = cld.image(comment.avatar_cloud)
                });
                dispatch(refreshAllList(responseDBJSON.comments));
            }
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