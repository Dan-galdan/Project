import './header.css';
import logo from './logo.PNG';
import '@fontsource/inter/700.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/300.css';
import { useState } from 'react';
import { Create } from './createpost.jsx';
import { AnimatePresence, motion } from 'framer-motion'; // Correct import

function Header() {
    const [shown, setShown] = useState(false); // Initialize as false to hide popup by default

    const handleClick = () => {
        setShown(!shown);
    };

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
                    <motion.div
                        className="popup"
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
                        <div className="popup2" id="gt">
                            <span className="iconamoon--profile-light"></span>
                            <p>My Profile</p>
                            <span className="weui--arrow-filled"></span>
                        </div>
                        <div className="popup2">
                            <span className="akar-icons--gear"></span>
                            <p>Settings</p>
                            <span className="weui--arrow-filled"></span>
                        </div>
                        <div className="popup2" id='brr'>
                            <span className="tabler--logout"></span>
                            <p>Logout</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Header;