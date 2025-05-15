import './header.css'
import logo from './logo.PNG'
import "@fontsource/inter/700.css";
import '@fontsource/inter/500.css'

function Header(){
    return(
        <>
            <div className='header'>
                <span class="uil--bars"></span>
                <div className='a'></div>
                <img src={logo} alt="" />
                <h2  className='imga'>TellU</h2>
                <input type="search" placeholder='Search' className='Searcht' name="" id=""/>
                <span class="material-symbols--search"></span>
                <div className='chi'>
                    <div className='teneg'>
                        <span class="material-symbols--person-rounded"></span>
                        <p>Account</p>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default Header;