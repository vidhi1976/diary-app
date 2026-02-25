import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Call the register endpoint instead of login
            const response = await api.post('/auth/register', { username, password });
            // Log the user in immediately after successful registration
            login(response.data.token);
            // Navigate to the main dashboard page
            navigate('/');
        } catch (err) {
            // Handle potential errors, like if the username is already taken
            setError('Failed to register. The username may already exist.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-cream rounded-xl shadow-lg border-2 border-coffee">
                <h1 className="text-4xl font-display text-coffee text-center">My Secret Diary</h1>
                <h2 className="text-2xl font-bold text-center text-coffee">Create Your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-sm font-bold text-coffee block">Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required
                               className="w-full p-2 mt-1 text-coffee bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-sunset" />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-coffee block">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                               className="w-full p-2 mt-1 text-coffee bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-sunset" />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button type="submit" className="w-full py-2 px-4 bg-sunset text-black font-bold rounded-md hover:bg-opacity-90 transition-all duration-300">
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-coffee">
                    Already have an account? <Link to="/login" className="font-bold text-sunset hover:underline">Log in!</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
