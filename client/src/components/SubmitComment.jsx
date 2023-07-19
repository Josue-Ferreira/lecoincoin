import React, {useState, useRef, useEffect} from 'react';
import {Cloudinary} from "@cloudinary/url-gen";
import { 
    Button,
    FormGroup,
    Form,
    Input 
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { addComment, updateComment } from '../features/comment/commentSlice';

// const SubmitComment = ({productID, comments, setComments, method, modify, setModify, comment}) => {
const SubmitComment = ({productID, modify, setModify, comment}) => {
    const [newComment, setNewComment] = useState(comment ? comment.comment : '');
    const cld = new Cloudinary({
        cloud: {
          cloudName: process.env.REACT_APP_CLOUDINARY_NAME
        }
      }); 
    const commentRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (commentRef.current) {
            commentRef.current.style.height = "0px";
            const scrollHeight = commentRef.current.scrollHeight + 20;
            commentRef.current.style.height = scrollHeight + "px";
        }
    }, [newComment]);

    const handleSubmitComment = async(e) => {
        e.preventDefault();
        const urlPost = `/product/${productID}/comment/add-new`;
        const urlPut = comment ? `/product/${productID}/comment/${comment.id}` : null;
        if(newComment){
            const responseDB = await fetch(modify ? urlPut : urlPost,{
                method: modify ? 'PUT' : 'POST',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({"comment": newComment})
            });
            if(responseDB.status == 200){
                const responseDBJSON = await responseDB.json();
                responseDBJSON.comment.avatar_cloud = cld.image(responseDBJSON.comment.avatar_cloud);
                if(modify){
                    // setComments(previous => previous.map(element => responseDBJSON.comment.id == element.id ? responseDBJSON.comment : element));
                    dispatch(updateComment(responseDBJSON.comment));
                    setModify(false);
                }
                else{
                    dispatch(addComment(responseDBJSON.comment));
                }
                    // setComments([...comments, responseDBJSON.comment]);
                setNewComment('');
            }
        }
    } 

    return (
        <Form onSubmit={handleSubmitComment} >
            <FormGroup>
                <Input
                    id="exampleText"
                    name="text"
                    type="textarea"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    style={{marginBottom: '10px', resize: 'none'}}
                    innerRef={commentRef}
                />
                <Button type='submit' color={modify ? 'warning' : 'success'}>
                    {modify ? ('Modify comment') : ('Add new comment')}
                </Button>
                {
                    modify && (
                        <Button onClick={() => setModify(false)} color='danger' style={{marginLeft: '10px'}}>
                            Cancel
                        </Button>
                    )
                }
            </FormGroup>
        </Form>
    );
};

export default SubmitComment;