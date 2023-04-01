import React, { useState } from 'react'
import { Navbar } from '../components'
import { Link } from 'react-router-dom'
import { ADD_USER_MUTATION } from '../utils/mutations'
import { useMutation } from '@apollo/client'
import Auth from '../utils/auth'

const UserSignup = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")
    const [addUser, { loading, error, data }] = useMutation(ADD_USER_MUTATION);

    const handleSubmit = async (event) => {
        try {
            const { data } = await addUser({ variables: { firstName, lastName, email, password } });
            const token = data.addUser.token
            Auth.login(token, false)
            console.log('New user added:', data.addUser.user);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className='login-card'>
                <h3>User Signup</h3>
                <form onSubmit={e => e.preventDefault()}>

                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='Enter First name' />
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Enter Last name' />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email Address' />
                    <input type="password" value={password} onChange={(e) => setPass(e.target.value)} placeholder='Enter Password' />
                    <button type='submit' onClick={handleSubmit}>Submit</button>

                    <Link to='/admin-signup' >Signup as Admin</Link>


                </form>
            </div>
        </>
    )
}

export default UserSignup