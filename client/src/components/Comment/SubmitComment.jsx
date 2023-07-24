import React, {useState, useRef, useEffect} from 'react';
import {Cloudinary} from "@cloudinary/url-gen";
import { 
    Button,
    FormGroup,
    Form,
    Input 
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { addComment, updateComment } from '../../features/comment/commentSlice';
import { fetchPOST, fetchPUT } from '../../helpers/fetchBack';

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
        if(newComment){
            if(modify){
                const urlPut = `/product/${productID}/comment/${comment.id}`;
                const json = await fetchPUT(urlPut, {"comment": newComment});
                dispatch(updateComment(json.comment));
                setModify(false);
            }else{
                const urlPost = `/product/${productID}/comment/add-new`;
                const json = await fetchPOST(urlPost, {"comment": newComment});
                dispatch(addComment(json.comment));
            }
            setNewComment('');
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