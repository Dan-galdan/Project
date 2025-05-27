import './header.css';
import logo from './logo.PNG';
import "@fontsource/inter/700.css";
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/300.css'
import { useState } from 'react';
import {Create} from './createpost.jsx'

function Header() {
    const [shown, setShown] = useState(true);
    
    const handleClick = () => {
        setShown(!shown);
    }

    return (
        <div className='header'>
            <span className="uil--bars" ></span>
            <div className='a'></div>
            <img src={logo} alt="Logo" />
            <h2 className='inter-imga'>TellU</h2>
            <div className='sea'>
                <input type="search" placeholder="Search" className="Searcht" />
                <span className="material-symbols--search-rounded"></span>
            </div>

            <div className='chi'>
                <button id='teneg' onClick={handleClick}> 
                    <span className="material-symbols--person-rounded"></span>
                    <p>Account</p>
                </button>
                <Create/>

            </div>
            <div  className={shown ? 'hidden' : 'visible'} >
                <div className='popup'>
                    <div className='popup1'>
                        <div className='image'></div>
                        <div className='nameandmail'>
                            <h4>Your Name</h4>
                            <p>badamdorj@gmail.com</p>
                        </div>
                    </div>
                    <div className='popup2' id='gt'>
                        <span class="iconamoon--profile-light"></span>
                        <p>My Profile</p>
                        <span class="weui--arrow-filled"></span>
                    </div>
                    <div className='popup2'>
                        <span class="akar-icons--gear"></span>
                        <p>Settings</p>
                        <span class="weui--arrow-filled"></span>
                    </div>
                    <div className='popup2'>
                        <span class="tabler--logout"></span>
                        <p>My Profile</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;