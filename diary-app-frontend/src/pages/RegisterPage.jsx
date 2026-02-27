import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ShadowBox from '../components/ShadowBox';
import ShadowButton from '../components/ShadowButton';
import api from '../services/api';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Call the register endpoint instead of login
            const response = await api.post('/auth/register', { name, username, password });
            // Log the user in immediately after successful registration
            login(response.data.token, response.data.user.name);
            // Navigate to the main dashboard page
            navigate('/');
        } catch (err) {
            // Handle potential errors, like if the username is already taken
            setError('Failed to register. The username may already exist.');
        }
    };

    return (

            <div className="flex flex-col items-center justify-center min-h-screen">
                <ShadowBox className="lg:h-[500px] lg:w-[450px] h-[480px] w-[380px] ">
                        <h1 className="text-4xl font-display text-coffee text-center">My Secret Diary</h1>
                        <h2 className="text-2xl mt-1 lg:mt-3 font-bold text-center text-coffee">Create an account!</h2>
                        <form onSubmit={handleSubmit} className="space-y-6 ">
                             <div>
                                <label className="text-sm mt-1 font-bold text-coffee block">Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                                       className="w-full p-2 1 shadow-amber-950 shadow-sm border-black text-coffee bg-white border-2 rounded-md focus:bg-orange-50" />
                            </div>
                             <div>
                                <label className="text-sm  font-bold text-coffee block">Username</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required
                                       className="w-full p-2  shadow-amber-950 shadow-sm border-black text-coffee bg-white border-2 rounded-md focus:bg-orange-50" />
                            </div>
                            <div>
                                <label className="text-sm font-bold text-coffee block">Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                                       className="w-full p-2  border-2 shadow-amber-950 shadow-sm border-black text-coffee bg-white rounded-md  focus:bg-orange-50" />
                            </div>
                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            <div className="flex justify-center">
                                <ShadowButton type="submit" className="">
                                    SignUp
                                </ShadowButton>
                            </div>
                            
                        </form>
            
                    </ShadowBox>

                    <p className="text-center text-coffee mt-8">
                Already have an account? <Link to="/login" className="font-bold text-sunset hover:underline">Log in!</Link>
            </p>
                    
                    
            </div>

            
        // </div>
    );
};

export default RegisterPage;
