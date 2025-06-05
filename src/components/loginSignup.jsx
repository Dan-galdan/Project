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

    const handleClose = () => {
        setVisible(false);
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
                onClick={handleClose}
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
                        <button className="close-button" onClick={handleClose}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>

                    <div className="loginMain">
                        {activeTab === 'login' ? (
                            <>
                                <div className="loginForm">
                                    <p>Email</p>
                                    <input type="text" placeholder="your@email.com" />
                                </div>
                                <div className="loginForm" id="broa">
                                    <p>Password</p>
                                    <div className="bro">
                                        <input
                                            type={loginPasswordVisible ? 'text' : 'password'}
                                            placeholder="Password"
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
                                        <input type="checkbox" id="remember" />
                                        <label htmlFor="remember">Remember me</label>
                                    </div>
                                    <a href="#" className="forget-password">Forget Password?</a>
                                </div>
                                <div className='loginBtn'>Log In</div>
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
                                        <input type="text" placeholder='First Name' />
                                    </div>
                                    <div className='names'>
                                        <h2>Last Name</h2>
                                        <input type="text" placeholder='Last Name' />
                                    </div>
                                </div>
                                <div>
                                    <h2>Email</h2>
                                    <input type="text" placeholder='youremail@gmail.com' />
                                </div>
                                <div>
                                    <h2>Create Password</h2>
                                    <div className="bro">
                                        <input
                                            type={signupPasswordVisible ? 'text' : 'password'}
                                            placeholder="Create a password"
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
                                    <select id="role">
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="parent">Parent</option>
                                    </select>
                                    <div className='loginBtn' id='fick'>Sign Up</div>
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
