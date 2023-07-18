import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {Cloudinary} from "@cloudinary/url-gen";
import styled from 'styled-components';
import CommentCard from './CommentCard';
import SubmitComment from './SubmitComment';

const CommentContainer = styled.div`
    display: flex;
    width: 80%;
    margin: 50px auto;
    flex-direction: column;
`;

const CommentsList = ({productID}) => {
    const [comments, setComments] = useState();
    const user = useSelector(state => state.user.profile);
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
                console.log(responseDBJSON.comments)
                responseDBJSON.comments.forEach((comment,i) => {
                    responseDBJSON.comments[i].avatar_cloud = cld.image(comment.avatar_cloud)
                });
                setComments(responseDBJSON.comments);
            }
        }

        getComments();
    }, []);

    return (
        <CommentContainer>
            {comments && comments.map(comment => (
                <CommentCard key={comment.id} comment={comment} comments={comments} setComments={setComments} productID={productID} />
            ))}
            {user && <SubmitComment productID={productID} comments={comments} setComments={setComments} method={'POST'}/>}
        </CommentContainer>
    );
};

export default CommentsList;