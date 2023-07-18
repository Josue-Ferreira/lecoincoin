import React, {useState} from 'react';
import {Cloudinary} from "@cloudinary/url-gen";
import { 
    Button,
    FormGroup,
    Form,
    Input 
} from 'reactstrap';

const SubmitComment = ({productID, comments, setComments, method, modify, setModify, comment}) => {
    const [newComment, setNewComment] = useState(comment ? comment.comment : '');
    const cld = new Cloudinary({
        cloud: {
          cloudName: process.env.REACT_APP_CLOUDINARY_NAME
        }
      }); 

    const handleSubmitComment = async(e) => {
        e.preventDefault();
        if(newComment){
            const responseDB = await fetch(`/product/${productID}/comment/add-new`,{
                method: method,
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({"comment": newComment})
            });
            if(responseDB.status == 200){
                const responseDBJSON = await responseDB.json();
                responseDBJSON.comment.avatar_cloud = cld.image(responseDBJSON.comment.avatar_cloud);
                if(method === 'PUT'){
                    setComments(previous => previous.map(element => responseDBJSON.comment.id == element.id ? responseDBJSON.comment : element));
                    setModify(false);
                }
                else  
                    setComments([...comments, responseDBJSON.comment]);
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