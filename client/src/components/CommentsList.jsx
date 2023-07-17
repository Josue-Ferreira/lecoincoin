import React, { useEffect, useState } from 'react';
import { 
    Button,
    FormGroup,
    Form,
    Input 
} from 'reactstrap';
import { useSelector } from 'react-redux';
import {Cloudinary} from "@cloudinary/url-gen";
import styled from 'styled-components';
import CommentCard from './CommentCard';

const CommentContainer = styled.div`
    display: flex;
    width: 80%;
    margin: 50px auto;
    flex-direction: column;
`;

const CommentsList = ({productID}) => {
    const [comments, setComments] = useState();
    const [newComment, setNewComment] = useState();
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

    const handleSubmitComment = async(e) => {
        e.preventDefault();
        if(newComment){
            const responseDB = await fetch(`/product/${productID}/comment/add-new`,{
                method: 'POST',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({"comment": newComment})
            });
            if(responseDB.status == 200){
                const responseDBJSON = await responseDB.json();
                responseDBJSON.comment.avatar_cloud = cld.image(responseDBJSON.comment.avatar_cloud);
                setComments([...comments, responseDBJSON.comment]);
            }
        }
    } 

    return (
        <CommentContainer>
            {comments && comments.map(comment => (
                <CommentCard key={comment.id} comment={comment} setComments={setComments} productID={productID} />
            ))}
            {user && (
                <Form onSubmit={handleSubmitComment} >
                    <FormGroup>
                        <Input
                            id="exampleText"
                            name="text"
                            type="textarea"
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            style={{marginBottom: '10px', resize: 'none'}}
                        />
                        <Button type='submit' color='success'>
                            Add new comment
                        </Button>
                    </FormGroup>
                </Form>
            )}
        </CommentContainer>
    );
};

export default CommentsList;