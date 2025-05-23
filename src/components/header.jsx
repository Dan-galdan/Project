import './header.css';
import logo from './logo.PNG';
import "@fontsource/inter/700.css";
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import { useState } from 'react';

function Header() {
    const [shown, setShown] = useState(true);
    
    const handleClick = () => {
        setShown(!shown);
    }

    return (
        <div className='header'>
            <span className="uil--bars" onClick={handleClick}></span>
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
                <button className='teneg1'>
                    <span className="line-md--plus"></span>
                    <p>Create Post</p>
                </button>
            </div>
            <div  className={shown ? 'visible' : 'hidden'} >
                <div className='popup'>
                    <div className='popup1'>
                        <img src="" alt="" />
                        <div className='nameandmail'>
                            <p>Your Name</p>
                            <p>badamdorjbadam0611@gmail.com</p>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default Header;