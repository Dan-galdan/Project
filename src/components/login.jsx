import './login.css';
import '../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';

function Login({ loginRef, setVisible }) {
    const handleCloseLogin = () => {
        console.log('Closing login popup');
        setVisible(false);
    };

    return (
        <AnimatePresence mode="wait" onExitComplete={() => console.log('Login popup animation completed')}>
            <motion.div
                key="blur"
                className="loginBlur"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={handleCloseLogin}
            >
                <motion.div
                    key="popup"
                    className="loginPopup"
                    ref={loginRef}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="loginTop">
                        <h2>Log In</h2>
                        <button className="close-button" onClick={handleCloseLogin}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    <div className="loginMain">
                        <div className="loginForm">
                            <p>Email</p>
                            <input type="text" placeholder="fickdeinema@gmail.com" />
                        </div>
                        <div className="loginForm" id="broa">
                            <p>Password</p>
                            <div className="bro">
                                <input type="password" id="for" placeholder="Password_12345" />
                                <span className="mingcute--eye-line"></span>
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
                            <span>Sign up</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default Login;