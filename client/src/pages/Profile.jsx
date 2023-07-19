import React, {useState} from 'react';
import NavigationBar from '../components/NavigationBar';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../features/user/userSlice';
import styled from 'styled-components';
import { 
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert
} from 'reactstrap';
import { fetchPUT, postImage } from '../helpers/fetchBack';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 70vw;
    margin: auto;
`;

const Title = styled.h2`
    text-align: center;
`;

const Profile = () => {
    const user = useSelector(state => state.user.profile);
    const [successUpdate, setSuccessUpdate] = useState(false);
    const [warning, setWarning] = useState(false);
    const [firstName, setFirstName] = useState(user.firstname);
    const [lastName, setLastName] = useState(user.lastname);
    const [avatarFile, setAvatarFile] = useState();
    // const [email, setEmail] = useState(user.email);
    // const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const avatar_cloud = avatarFile ? await postImage(avatarFile) : null;
            const json = await fetchPUT('/user', {"firstname": firstName, "lastname": lastName, "avatar_cloud": avatar_cloud});
            dispatch(logIn(json.user));
            setSuccessUpdate(true);
            setWarning(false);
        } catch (e) {
            setSuccessUpdate(false);
            setWarning(true);
        }
    }

    // const handleChangePassword = async(e) => {
    //     e.preventDefault();
    //     const responseDB = await fetch('/users/profile/password/'+user.id,{
    //         method: 'PUT',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({"password": password})
    //     });
    //     if(responseDB.status == 200){
    //         setSuccessUpdate(true);
    //         setWarning(false);
    //     }
    //     else{
    //         setSuccessUpdate(false);
    //         setWarning(true);
    //     }
    // }

    return (
        <>
            <NavigationBar />
            <Container>
                <Title>MY PROFILE</Title>
                <Form onSubmit={handleSubmit} >
                    {
                        warning && (
                            <Alert color="danger">
                                Update failed : try again now or later please
                            </Alert>
                        )
                    }
                    {
                        successUpdate && (
                            <Alert color="success">
                                Your datas has been updated successfully !
                            </Alert>
                        )
                    }
                    <FormGroup >
                        <Label for="avatar">
                        Avatar
                        </Label>
                        <Input
                        id="avatar"
                        name="avatar"
                        type="file"
                        onChange={e => setAvatarFile(e.target.files[0])}
                        />
                    </FormGroup>
                    <FormGroup >
                        <Label for="firstname">
                        Firstname
                        </Label>
                        <Input
                        id="firstname"
                        name="firstname"
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastname">
                        Lastname
                        </Label>
                        <Input
                        id="lastname"
                        name="lastname"
                        placeholder="with a placeholder"
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                        />
                    </FormGroup>
                    {/* <FormGroup>
                        <Label for="exampleEmail">
                        Email
                        </Label>
                        <Input
                        id="exampleEmail"
                        name="email"
                        placeholder="with a placeholder"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        />
                    </FormGroup> */}
                    
                    <Button type='submit' color='primary' >
                        UPDATE
                    </Button>
                </Form>
                {/* <Title>Change password</Title>
                <Form onSubmit={handleChangePassword} >
                    <FormGroup>
                        <Label for="examplePassword">
                        Password
                        </Label>
                        <Input
                        id="examplePassword"
                        name="password"
                        placeholder="password placeholder"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <Button type='submit' color='warning' >
                        CHANGE PASSWORD
                    </Button>
                </Form> */}
            </Container>
        </>
    );
};

export default Profile;