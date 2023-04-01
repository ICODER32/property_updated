import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Auth from '../utils/auth';
import { LOGIN } from '../utils/mutations';
import { Navbar } from '../components';
import { Link } from 'react-router-dom';



const UserLogin = () => {

    const [login, { error }] = useMutation(LOGIN);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: { email: email, password: password },
            });
            const token = mutationResponse.data.login.token;
            const id = mutationResponse.data.login.user._id;
            Auth.login(token, undefined, id);
        } catch (e) {
            alert('Unauthorized')
        }
    };


    return (
        <>
            <Navbar />
            <div className='login-card'>
                <h3>User Login</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input type="email" onChange={e => setEmail(e.target.value)} value={email} />
                    <input type="password" onChange={e => setPassword(e.target.value)} value={password} />
                    <button type='submit' onClick={handleFormSubmit}>Submit</button>
                    <Link to='/admin-login'>Login as Admin</Link>
                </form>
            </div>
        </>
    )
}


export default UserLogin