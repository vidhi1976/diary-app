    import { useState, useContext } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { AuthContext } from '../context/AuthContext';
    import api from '../services/api';

    const LoginPage = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const { login } = useContext(AuthContext);
        const navigate = useNavigate();

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            try {
                const response = await api.post('/auth/login', { username, password });
                login(response.data.token);
                console.log("here is the login token : ",login);
                navigate('/dashboard');
            } catch (err) {
                setError('Failed to log in. Please check your credentials.');
            }
        };

        return (
            <div className="flex items-center justify-center min-h-screen bg-peach">
                <div className="w-full max-w-md p-8 space-y-6 bg-cream  border-2  rounded-xl shadow-lg">
                    <h1 className="text-4xl font-display text-coffee text-center">My Secret Diary</h1>
                    <h2 className="text-2xl font-bold text-center text-coffee">Welcome Back!</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Form fields for username and password */}
                        {/* ... (input fields similar to the one below) ... */}
                         <div>
                            <label className="text-sm font-bold text-coffee block">Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required
                                   className="w-full p-2 mt-1 border-yellow-950 text-coffee bg-white border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sunset" />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-coffee block">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                                   className="w-full p-2 mt-1 border-2 border-brown text-coffee bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-sunset" />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <button type="submit" className="w-full py-2 px-4 bg-sunset text-black  font-bold rounded-md hover:bg-opacity-90 transition-all duration-300">
                            Login
                        </button>
                    </form>
                    <p className="text-center text-coffee">
                        Don't have an account? <Link to="/register" className="font-bold text-sunset hover:underline">Sign up!</Link>
                    </p>
                </div>
            </div>
        );
    };

    export default LoginPage;
    
