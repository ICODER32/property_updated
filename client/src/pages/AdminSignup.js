import React, { useState } from 'react'
import { Navbar } from '../components'
import { Link } from 'react-router-dom'
import { SIGNUP_ADMIN } from '../utils/mutations'
import { useMutation } from '@apollo/client'
import Auth from '../utils/auth'

const AdminSignup = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")
    const [addUser, { loading, error, data }] = useMutation(SIGNUP_ADMIN);

    const handleSubmit = async (event) => {
        try {
            const { data } = await addUser({ variables: { firstName, lastName, email, password } });
            const token = data.signupAdmin.token
            const id = data.signupAdmin.user._id
            Auth.login(token, true, id)
            console.log('New user added:', data.addUser.user);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className='login-card'>
                <h3>Admin Signup</h3>
                <form onSubmit={e => e.preventDefault()}>

                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='Enter First name' />
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Enter Last name' />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email Address' />
                    <input type="password" value={password} onChange={(e) => setPass(e.target.value)} placeholder='Enter Password' />
                    <button type='submit' onClick={handleSubmit}>Submit</button>

                    <Link to='/signup' >Signup as User</Link>


                </form>
            </div>
        </>
    )
}

export default AdminSignup