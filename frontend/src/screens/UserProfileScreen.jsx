import FormContainer from '../components/FormContainer';
import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserProfileScreen = () => {

    const userInfo = useSelector((state) => state.auth);
    
    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState(userInfo.password);
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    
    
    const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();

    useEffect(() => {
        if(userInfo){
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo, userInfo.name, userInfo.email]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Password does not match');
        }else {
            try {
                const res = await updateProfile({_id: userInfo._id, name, email, password}).unwrap();
                dispatch(setCredentials(res));
                toast.success('Profile updated successfully')
            } catch (error) {
                toast.error(error?.data?.message || error.error);
            }
        }
    };

  return (
    <FormContainer>
    <h1>Profile Info</h1>

    <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control 
                type="name" 
                placeholder="Enter Name" 
                value={userInfo.name} 
                onChange={(e) => setName(e.target.value)}>
            </Form.Control>
        </Form.Group>
        
        <Form.Group controlId="email" className="my-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="Enter Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Enter Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId="comfirmPassword" className="my-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Enter Password Again" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}>
            </Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2" hidden={loadingUpdateProfile}>
            Save
        </Button>

        {loadingUpdateProfile && <Loader />}
    </Form>
</FormContainer>
  )
}

export default UserProfileScreen