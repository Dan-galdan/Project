import './header.css';
import logo from './logo.PNG';
import '@fontsource/inter/700.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/300.css';
import { useState, useEffect, useRef } from 'react';
import { Create } from './createpost.jsx';
import Login from './login.jsx';
import { AnimatePresence, motion } from 'framer-motion';

function Header() {
    const [shown, setShown] = useState(false); // For profile popup
    const [visible, setVisible] = useState(false); // For login component
    const popupRef = useRef(null); // Ref for profile popup
    const loginRef = useRef(null); // Ref for login popup content

    const handleClick = () => {
        setShown(!shown); // Toggle profile popup
    };

    const handleLogin = () => {
        setVisible(!visible); // Toggle login component
        setShown(false); // Close profile popup when opening login
    };

    const handleClosePopup = () => {
        setShown(false); // Close profile popup
    };

    // Handle clicks outside popup or login
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target) &&
                loginRef.current &&
                !loginRef.current.contains(event.target)
            ) {
                setShown(false);
                setVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="header">
            <span className="uil--bars"></span>
            <div className="a"></div>
            <img src={logo} alt="Logo" />
            <h2 className="inter-imga">TellU</h2>
            <div className="sea">
                <span className="material-symbols--search-rounded"></span>
                <input type="search" placeholder="Search" className="Searcht" />
            </div>

            <div className="chi">
                <button id="teneg" onClick={handleClick}>
                    <span className="material-symbols--person-rounded"></span>
                    <p>Account</p>
                </button>
                <Create />
            </div>

            <AnimatePresence>
                {shown && (
                    <>
                        <motion.div
                            className="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={handleClosePopup}
                        />
                        <motion.div
                            className="popup"
                            ref={popupRef}
                            initial={{ opacity: 0, scale: 0.8, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="popup1">
                                <div className="image"></div>
                                <div className="nameandmail">
                                    <h4>Your Name</h4>
                                    <p>badamdorj@gmail.com</p>
                                </div>
                            </div>
                            <div className="popup2" onClick={handleLogin} id="gt">
                                <span className="iconamoon--profile-light"></span>
                                <p>My Profile</p>
                                <span className="weui--arrow-filled"></span>
                            </div>
                            <div className="popup2">
                                <span className="akar-icons--gear"></span>
                                <p>Settings</p>
                                <span className="weui--arrow-filled"></span>
                            </div>
                            <div className="popup2" id="brr">
                                <span className="tabler--logout"></span>
                                <p>Logout</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {visible && <Login loginRef={loginRef} setVisible={setVisible} />}
            </AnimatePresence>
        </div>
    );
}

export default Header;