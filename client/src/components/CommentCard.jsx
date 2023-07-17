import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import {AdvancedImage} from "@cloudinary/react";
import {Cloudinary} from "@cloudinary/url-gen";
import { 
    Button,
    Form,
    FormGroup,
    Input,
    Popover,
    PopoverBody
} from 'reactstrap';
import {BsThreeDots} from 'react-icons/bs'

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

const CommentCard = ({comment, setComments, productID}) => {
    const user = useSelector(state => state.user.profile);
    const [modify, setModify] = useState(false);
    const [modifiedComment, setModifiedComment] = useState(comment.comment);
    const [isOpenCommentActions, setIsOpenCommentActions] = useState(false);
    const cld = new Cloudinary({
        cloud: {
          cloudName: process.env.REACT_APP_CLOUDINARY_NAME
        }
      }); 
    
    const handleDelete = async() => {
        const responseDB = await fetch(`/product/${productID}/comment/${comment.id}`,{
            method: 'DELETE'
        });
        if(responseDB.status == 200){
            setComments(previous => previous.filter(element => comment.id != element.id));
        }
    }

    const handleSubmitComment = async(e) => {
        e.preventDefault();
        if(modifiedComment.length > 0){
            const responseDB = await fetch(`/product/${productID}/comment/${comment.id}`,{
                method: 'PUT',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({"comment": modifiedComment})
            });
            if(responseDB.status == 200){
                const responseDBJSON = await responseDB.json();
                responseDBJSON.comment.avatar_cloud = cld.image(responseDBJSON.comment.avatar_cloud);
                setComments(previous => previous.map(element => comment.id == element.id ? responseDBJSON.comment : element));
            }
            setModify(false);
        }
    } 

    return (
        <Comment>
            <AuthorComment>
                <AdvancedImage cldImg={comment.avatar_cloud} style={{maxHeight: '50px', borderRadius: '50%', marginRight: '10px'}} />
                <AuthorCommentInfos>
                    <div>{comment.firstname} {comment.lastname}</div>
                    <div>at {comment.created_at} {comment.updated_at && `updated at ${comment.updated_at}`}</div>
                </AuthorCommentInfos>
                {
                    user && comment.email == user.email && !modify && (
                        <>
                            <Button outline id={'commentActions'+comment.id} style={{borderRadius: '100%', padding: '2px 8px'}}><BsThreeDots /></Button>
                            <Popover
                                target={'commentActions'+comment.id}
                                placement="bottom"
                                trigger="focus"
                                isOpen={isOpenCommentActions}
                                toggle={() => setIsOpenCommentActions(!isOpenCommentActions)}
                            >
                                <PopoverBody style={{display: 'flex', flexDirection: 'column'}}>
                                    <Button onClick={() => setModify(true)} style={{marginBottom: "10px"}} color='warning'>Modify</Button> 
                                    <Button onClick={handleDelete} style={{marginBottom: "10px"}} color='danger'>Delete</Button>
                                </PopoverBody>
                            </Popover>
                        </>
                )}
            </AuthorComment>
            {
                modify 
                ? (<Form onSubmit={handleSubmitComment} >
                    <FormGroup>
                        <Input
                            id="exampleText"
                            name="text"
                            type="textarea"
                            value={modifiedComment}
                            onChange={e => setModifiedComment(e.target.value)}
                            style={{marginBottom: '10px', resize: 'none'}}
                        />
                        <Button type='submit' color='success'>
                            Modify
                        </Button>
                    </FormGroup>
                    </Form>)
                : (<p>{comment.comment}</p>)
            }
        </Comment>
    );
};

export default CommentCard;