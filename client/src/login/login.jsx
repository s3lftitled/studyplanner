import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import img from '../images/login.jpg'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        
        if (!email || !password) {
            setError("Email and Password are required.");
            return;
        }

        const payload = { email, password };
        console.log('Payload being sent:', payload); 

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) { 
                setSuccess(data.message);
                localStorage.setItem('token', data.token); 
                navigate('/'); 
            } else {
                setError(data.message); 
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container">
            <div className="image-container">
                <img src={img} alt="img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="login-container">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>} {}
                {success && <p className="success">{success}</p>} {}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link to="/signup">Sign up here</Link></p> {}
            </div>
        </div>
    );
};

export default LoginPage;