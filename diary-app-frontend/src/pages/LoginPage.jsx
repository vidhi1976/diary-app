    import { useState, useContext } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { AuthContext } from '../context/AuthContext';
    import api from '../services/api';
    import ShadowBox from '../components/ShadowBox';
    import ShadowButton from '../components/ShadowButton';
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
                login(response.data.token, response.data.user.name);
                console.log("here is the login token : ",login);
                navigate('/');
            } catch (err) {
                setError('Failed to log in. Please check your credentials.');
            }
        };
        return (
            <div className="flex items-center justify-center min-h-screen bg-peach">
                <ShadowBox className="lg:h-[500px] lg:w-[450px] h-[370px] w-[300px]">
                    <h1 className="text-4xl font-display text-coffee text-center">My Secret Diary</h1>
                    <h2 className="text-2xl mt-2 lg:mt-3 font-bold text-center text-coffee">Welcome Back!</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                         <div>
                            <label className="text-sm mt-2 font-bold text-coffee block">Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required
                                   className="w-full p-2 mt-1 shadow-amber-950 shadow-sm border-black text-coffee bg-white border-2 rounded-md focus:bg-orange-50" />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-coffee block">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                                   className="w-full p-2 mt-1 border-2 shadow-amber-950 shadow-sm border-black text-coffee bg-white rounded-md  focus:bg-orange-50" />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <div className="flex justify-center">
                            <ShadowButton type="submit" className="">
                                Login
                            </ShadowButton>
                        </div>
                        {/* <button type="submit" className="w-full py-2 px-4 bg-sunset text-black  font-bold rounded-md hover:bg-opacity-90 transition-all duration-300">
                            Login
                        </button> */}
                    </form>
                    <p className="text-center text-coffee mt-4">
                        Don't have an account? <Link to="/register" className="font-bold text-sunset hover:underline">Sign up!</Link>
                    </p>
                {/* </div> */}
                </ShadowBox> 
            </div>
        );
    };
    export default LoginPage;
    
