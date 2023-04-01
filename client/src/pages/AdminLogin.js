import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Auth from '../utils/auth';
import { ADMIN_LOGIN_MUTATION } from '../utils/mutations';
import { Navbar } from '../components';
import { Link } from 'react-router-dom';



const AdminLogin = () => {

    const [login, { error }] = useMutation(ADMIN_LOGIN_MUTATION);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: { email: email, password: password },
            });
            const token = mutationResponse.data.adminLogin.token;
            const id = mutationResponse.data.adminLogin.user._id;

            Auth.login(token, true, id);
        } catch (e) {
            alert('Unauthorized')
        }
    };


    return (
        <>
            <Navbar />
            <div className='login-card'>
                <h3>Admin Login</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input type="email" onChange={e => setEmail(e.target.value)} value={email} />
                    <input type="password" onChange={e => setPassword(e.target.value)} value={password} />
                    <button type='submit' onClick={handleFormSubmit}>Submit</button>
                    <Link to='/login'>Login as User</Link>
                </form>
            </div>
        </>
    )
}


export default AdminLogin