import './loginSignup.css';
import '../index.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';

function LoginSignup({ loginRef, setVisible }) {
    const [activeTab, setActiveTab] = useState('login');
    const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
    const [signupPasswordVisible, setSignupPasswordVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    // 🔹 Login state
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // 🔹 Signup state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('student');

    // ✅ Remove direct close — only allow after success
    const handleClose = () => {
        setVisible(false);
    };

    // 🔹 Save new user to database - FIXED: Uses proper API endpoint
    const handleSignup = async () => {
        setIsLoading(true);

        // 1️⃣ Make sure all fields are filled
        if (!firstName || !lastName || !signupEmail || !signupPassword) {
            alert("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        // 2️⃣ Check password length
        if (signupPassword.length < 8) {
            alert("Password must be at least 8 characters long");
            setIsLoading(false);
            return;
        }

        // 3️⃣ Check password match
        if (signupPassword !== confirmPassword) {
            alert("Passwords do not match");
            setIsLoading(false);
            return;
        }

        // 4️⃣ Basic email validation
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(signupEmail)) {
            alert("Please enter a valid email address");
            setIsLoading(false);
            return;
        }

        const newUser = {
            firstName,
            lastName,
            email: signupEmail,
            password: signupPassword,
            role
        };

        try {
            const res = await fetch("http://localhost:3000/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            });

            const data = await res.json();

            if (data.success) {
                alert("User registered successfully!");
                // Store token if needed
                if (data.token) {
                    if (rememberMe) {
                        localStorage.setItem("token", data.token);
                    } else {
                        sessionStorage.setItem("token", data.token);
                    }
                }
                setActiveTab("login");
            } else {
                alert(data.message || "Failed to register user.");
            }
        } catch (err) {
            console.error("Signup error:", err);
            alert("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    // 🔹 Login function - FIXED: No more password in URL
    const handleLogin = async () => {
        setIsLoading(true);

        try {
            // Use POST request with body instead of GET with URL params
            const res = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword
                })
            });

            const data = await res.json();

            if (data.success) {
                alert("Login successful!");

                if (rememberMe) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                } else {
                    sessionStorage.setItem("user", JSON.stringify(data.user));
                    sessionStorage.setItem("token", data.token);
                }

                handleClose();
            } else {
                alert(data.message || "Invalid email or password");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="blur"
                className="loginBlur"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                // 🚫 disable background click close
                onClick={(e) => e.stopPropagation()}
            >
                <motion.div
                    key="popup"
                    className="loginPopup"
                    ref={loginRef}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="loginTop">
                        <h2>{activeTab === 'login' ? 'Log In' : 'Sign Up'}</h2>
                        {/* 🚫 Hide the X button until logged in */}
                        {false && (
                            <button className="close-button" onClick={handleClose}>
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        )}
                    </div>

                    <div className="loginMain">
                        {activeTab === 'login' ? (
                            <>
                                <div className="loginForm">
                                    <p>Email</p>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="loginForm" id="broa">
                                    <p>Password</p>
                                    <div className="bro">
                                        <input
                                            type={loginPasswordVisible ? 'text' : 'password'}
                                            placeholder="Password"
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            required
                                        />
                                        <span
                                            className="eye-icon"
                                            onClick={() => setLoginPasswordVisible(!loginPasswordVisible)}
                                        >
                                            <FontAwesomeIcon icon={loginPasswordVisible ? faEyeSlash : faEye} />
                                        </span>
                                    </div>
                                </div>
                                <div className="loginFor">
                                    <div className="remember-me">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        <label htmlFor="remember">Remember me</label>
                                    </div>
                                    <a href="#" className="forget-password">Forget Password?</a>
                                </div>
                                <div
                                    className='loginBtn'
                                    onClick={handleLogin}
                                    style={{
                                        opacity: isLoading ? 0.7 : 1,
                                        cursor: isLoading ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {isLoading ? 'Logging in...' : 'Log In'}
                                </div>
                                <div className='bottomtext'>
                                    <p>Don't have an account?</p>
                                    <span
                                        onClick={() => setActiveTab('signup')}
                                        style={{ cursor: 'pointer', color: '#007bff' }}
                                    >
                                        Sign up
                                    </span>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='signupForm'>
                                    <div className='names'>
                                        <h2>First Name</h2>
                                        <input
                                            type="text"
                                            placeholder='First Name'
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className='names'>
                                        <h2>Last Name</h2>
                                        <input
                                            type="text"
                                            placeholder='Last Name'
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h2>Email</h2>
                                    <input
                                        type="email"
                                        placeholder='youremail@gmail.com'
                                        value={signupEmail}
                                        onChange={(e) => setSignupEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <h2>Create Password</h2>
                                    <div className="bro">
                                        <input
                                            type={signupPasswordVisible ? 'text' : 'password'}
                                            placeholder="Create a password"
                                            value={signupPassword}
                                            onChange={(e) => setSignupPassword(e.target.value)}
                                            required
                                        />
                                        <span
                                            className="eye-icon"
                                            onClick={() => setSignupPasswordVisible(!signupPasswordVisible)}
                                        >
                                            <FontAwesomeIcon icon={signupPasswordVisible ? faEyeSlash : faEye} />
                                        </span>
                                    </div>
                                    <div>
                                        <div className="bro">
                                            <input
                                                type={signupPasswordVisible ? 'text' : 'password'}
                                                placeholder="Confirm your password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                            <span
                                                className="eye-icon"
                                                onClick={() => setSignupPasswordVisible(!signupPasswordVisible)}
                                            >
                                                <FontAwesomeIcon icon={signupPasswordVisible ? faEyeSlash : faEye} />
                                            </span>
                                        </div>
                                    </div>
                                    <p className='optionRole'>I am a:</p>
                                    <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="parent">Parent</option>
                                    </select>
                                    <div
                                        className='loginBtn'
                                        id='fick'
                                        onClick={handleSignup}
                                        style={{
                                            opacity: isLoading ? 0.7 : 1,
                                            cursor: isLoading ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {isLoading ? 'Signing up...' : 'Sign Up'}
                                    </div>
                                </div>
                                <div className='bottomtext'>
                                    <p>Already have an account?</p>
                                    <span
                                        onClick={() => setActiveTab('login')}
                                        style={{ cursor: 'pointer', color: '#007bff' }}
                                    >
                                        Log in
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default LoginSignup;
